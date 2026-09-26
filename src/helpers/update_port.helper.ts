import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

import { error } from './error.helper';

export function updatePort(targetDir: string, port: number, libraries: string[]): void {
  const viteConfigPath = path.join(targetDir, 'vite.config.js');

  if (existsSync(viteConfigPath)) {
    const viteConfig = readFileSync(viteConfigPath, 'utf8');
    const updatedViteConfig = viteConfig.replace(/port:\s*\d+/, `port: ${port}`);

    try {
      writeFileSync(viteConfigPath, updatedViteConfig);
    } catch (err) {
      error('Error write vite.config.js', err);
    }
  }

  const tauriConfigPath = path.join(targetDir, 'tauri.config.json');

  if (libraries.includes('tauri') && existsSync(tauriConfigPath)) {
    const tauriConfig = JSON.parse(readFileSync(tauriConfigPath, 'utf8'));

    tauriConfig.build = { ...tauriConfig.build, devUrl: `http://localhost:${port}` };

    try {
      writeFileSync(tauriConfigPath, JSON.stringify(tauriConfig, null, 2));
    } catch (err) {
      error('Error write tauri.config.json', err);
    }
  }
}
