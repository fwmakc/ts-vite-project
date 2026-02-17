import path from 'path';

import { copyFile } from './copy_file.helper';
import { makeTargetFolder } from './make_target_folder.helper';

export async function backupProject(targetFolder: string): Promise<void> {
  const backupFolder = path.join(targetFolder, '.backup');

  // Проверяем и создаем каталог бэкапа проекта
  await makeTargetFolder(backupFolder);

  const files = [
    '.gitignore',
    '.prettierignore',
    'eslint.config.js',
    'jest.config.js',
    'vite.config.js',
    'vitest.config.js',
    'prettier.config.js',
    'tsconfig.json',
    'package.json',
  ];

  // Делаем бэкап
  for (const file of files) {
    try {
      copyFile(file, targetFolder, backupFolder);
      // eslint-disable-next-line no-empty
    } catch (_err) {}
  }
}
