import { beforeEach, describe, expect, it, vi } from 'vitest';

import { runtimes } from '../consts/runtimes.const';
import { print } from '../helpers/print.helper';
import { multiselect } from '../prompts/multiselect.prompt';
import { librariesSelect } from '../select/libraries.select';

vi.mock('../prompts/multiselect.prompt', () => ({
  multiselect: vi.fn(),
}));

vi.mock('../helpers/print.helper', () => ({
  print: vi.fn(),
}));

const mockedMultiselect = vi.mocked(multiselect);
const mockedPrint = vi.mocked(print);

describe('librariesSelect', () => {
  beforeEach(() => {
    mockedMultiselect.mockReset();
    mockedPrint.mockClear();
  });

  it('console: предлагает только совместимые аддоны', async () => {
    mockedMultiselect.mockResolvedValue([]);

    await librariesSelect(runtimes.npm, 'ts console app');

    expect(mockedMultiselect).toHaveBeenCalledWith('Select extended project libraries', [
      'biome',
      'eslint + prettier',
      'semantic',
      '- github',
      '- gitlab',
    ]);
  });

  it('vite: предлагает все аддоны, кроме обеих баз', async () => {
    mockedMultiselect.mockResolvedValue([]);

    await librariesSelect(runtimes.npm, 'ts + vite app');

    const options = mockedMultiselect.mock.calls[0]?.[1] ?? [];

    expect(options).not.toContain('ts console app');
    expect(options).not.toContain('ts + vite app');
    expect(options).toContain('biome');
    expect(options).toContain('tailwind');
    expect(options).toContain('electron');
    expect(options).toContain('- builder');
    expect(options).toContain('- forge');
    expect(options).toContain('capacitor');
    expect(options).toContain('tauri');
    expect(options).toHaveLength(11);
  });

  it('база всегда первая в итоговом списке libraries', async () => {
    mockedMultiselect.mockResolvedValue(['- github']);

    const result = await librariesSelect(runtimes.npm, 'ts console app');

    expect(result.libraries?.[0]).toBe('ts console app');
  });

  it("'- github' автоматически добавляет 'semantic' с уведомлением", async () => {
    mockedMultiselect.mockResolvedValue(['- github']);

    const result = await librariesSelect(runtimes.npm, 'ts console app');

    expect(result.libraries).toEqual(['ts console app', '- github', 'semantic']);
    expect(mockedPrint).toHaveBeenCalledWith([expect.stringContaining("'- github' requires 'semantic'")]);
  });

  it("'- forge' автоматически добавляет 'electron' и переопределяет main", async () => {
    mockedMultiselect.mockResolvedValue(['- forge']);

    const result = await librariesSelect(runtimes.npm, 'ts + vite app');

    expect(result.libraries).toContain('electron');
    expect(result.main).toBe('electron/main.ts');
    expect(mockedPrint).toHaveBeenCalledWith([expect.stringContaining("'- forge' requires 'electron'")]);
  });

  it('не добавляет зависимость повторно, если она уже выбрана', async () => {
    mockedMultiselect.mockResolvedValue(['- forge', 'electron']);

    const result = await librariesSelect(runtimes.npm, 'ts + vite app');

    expect(result.libraries?.filter(library => library === 'electron')).toHaveLength(1);
    expect(mockedPrint).not.toHaveBeenCalled();
  });

  it('консоль перебивает dev-скрипт рантайма, vite оставляет своим', async () => {
    mockedMultiselect.mockResolvedValue([]);

    const consoleResult = await librariesSelect(runtimes.npm, 'ts console app');
    const viteResult = await librariesSelect(runtimes.npm, 'ts + vite app');

    expect(consoleResult.scripts?.dev).toBe('ts-node src/index.ts');
    expect(viteResult.scripts?.dev).toBe('vite');
  });

  it('подставляет {runtime:run} во всех скриптах', async () => {
    mockedMultiselect.mockResolvedValue(['electron']);

    const result = await librariesSelect(runtimes.npm, 'ts + vite app');

    expect(result.scripts?.['electron:compile']).toBe(
      'cross-env VITE_BUILD_TARGET=electron VITE_RUNTIME_PLATFORM=desktop npm run compile',
    );

    for (const command of Object.values(result.scripts ?? {})) {
      expect(command).not.toContain('{runtime:run}');
    }
  });

  it('main и types от базовых шаблонов', async () => {
    mockedMultiselect.mockResolvedValue([]);

    const consoleResult = await librariesSelect(runtimes.npm, 'ts console app');
    const viteResult = await librariesSelect(runtimes.npm, 'ts + vite app');

    expect(consoleResult.main).toBe('dist/index.js');
    expect(viteResult.main).toBe('dist/index.js');
    expect(viteResult.types).toBe('dist/index.d.ts');
  });

  it('консоль не тянет браузерные devDependencies', async () => {
    mockedMultiselect.mockResolvedValue([]);

    const result = await librariesSelect(runtimes.npm, 'ts console app');
    const devDependencies = result.devDependencies ?? [];

    expect(devDependencies).not.toContain('vite');
    expect(devDependencies).not.toContain('jsdom');
    expect(devDependencies).not.toContain('@types/jsdom');
    expect(devDependencies).not.toContain('terser');
    expect(devDependencies).not.toContain('cross-env');
    expect(devDependencies).toContain('typescript');
    expect(devDependencies).toContain('vitest');
    expect(devDependencies).toContain('ts-node');
  });

  it('vite тянет браузерные devDependencies и пакеты адаптеров', async () => {
    mockedMultiselect.mockResolvedValue([]);

    const result = await librariesSelect(runtimes.npm, 'ts + vite app');
    const devDependencies = result.devDependencies ?? [];

    expect(devDependencies).toContain('vite');
    expect(devDependencies).toContain('vitest');
    expect(devDependencies).toContain('jsdom');
    expect(devDependencies).toContain('terser');
    expect(devDependencies).toContain('@capacitor/filesystem');
    expect(devDependencies).toContain('@tauri-apps/plugin-fs');
  });
});
