import path from 'path';

import { copyFile } from '../helpers/copy_file.helper';
import { copyRecursive } from '../helpers/copy_recursive.helper';

export async function copyProject(targetFolder: string): Promise<void> {
  // Копируем файлы из template
  copyRecursive(path.join(__dirname, 'template'), targetFolder);

  // Копируем остальные файлы
  copyFile('.gitignore', __dirname, targetFolder);
  copyFile('LICENSE', __dirname, targetFolder);
  copyFile('README.md', __dirname, targetFolder);
}
