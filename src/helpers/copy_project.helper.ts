import path from 'path';

import { packages } from '../consts/packages.const';

import { copyFile } from './copy_file.helper';
import { copyRecursive } from './copy_recursive.helper';

export async function copyProject(sourceFolder: string, targetFolder: string, libraries: string[]): Promise<void> {
  // Копируем файлы из template
  copyRecursive(path.join(sourceFolder, 'template', 'common'), targetFolder);

  for (const library of libraries) {
    if (packages[library]?.template) {
      copyRecursive(path.join(sourceFolder, 'template', packages[library].template), targetFolder);
    }
  }

  // Копируем остальные файлы
  copyFile('.gitignore', sourceFolder, targetFolder);
  copyFile('LICENSE', sourceFolder, targetFolder);
  copyFile('README.md', sourceFolder, targetFolder);
}
