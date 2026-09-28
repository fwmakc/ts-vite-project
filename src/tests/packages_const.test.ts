import { describe, expect, it } from 'vitest';

import { appTypes } from '../consts/app_types.const';
import { packages } from '../consts/packages.const';

describe('packages const', () => {
  it('ключи appTypes существуют в packages, обе базы на месте', () => {
    for (const key of Object.keys(appTypes)) {
      expect(packages[key]).toBeDefined();
    }

    expect(Object.keys(appTypes)).toEqual(['ts console app', 'ts + vite app']);
  });

  it('bases ссылаются только на существующие типы приложений', () => {
    for (const entry of Object.values(packages)) {
      for (const base of entry.bases ?? []) {
        expect(appTypes[base]).toBeDefined();
      }
    }
  });

  it('requires ссылаются на существующие не-базовые пакеты, без циклов', () => {
    for (const [key, entry] of Object.entries(packages)) {
      for (const requirement of entry.requires ?? []) {
        expect(packages[requirement]).toBeDefined();
        expect(appTypes[requirement]).toBeUndefined();
        expect(requirement).not.toBe(key);
      }
    }
  });

  it('аддоны с ограничением bases не доступны консоли', () => {
    for (const [key, entry] of Object.entries(packages)) {
      if (['tailwind', 'electron', '- builder', '- forge', 'capacitor', 'tauri'].includes(key)) {
        expect(entry.bases).toEqual(['ts + vite app']);
      }
    }
  });

  it('консольная база: main задан, тесты на vitest, без упоминаний jest', () => {
    const entry = packages['ts console app'];

    expect(entry?.main).toBe('dist/index.js');
    expect(entry?.scripts?.test).toContain('vitest');
    expect(JSON.stringify(entry)).not.toContain('jest');
  });

  it('vite база: main и types заданы, devDependencies содержат пакеты адаптеров', () => {
    const entry = packages['ts + vite app'];

    expect(entry?.main).toBe('dist/index.js');
    expect(entry?.types).toBe('dist/index.d.ts');

    for (const dependency of [
      '@capacitor/filesystem',
      '@tauri-apps/api',
      '@tauri-apps/plugin-dialog',
      '@tauri-apps/plugin-fs',
    ]) {
      expect(entry?.devDependencies).toContain(dependency);
    }
  });
});
