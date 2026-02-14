import { mkdirSync, rmSync } from 'fs';

import { confirm } from '../prompts/confirm.prompt';

import { error } from './error.helper';
import { isDirectoryEmpty } from './is_directory_empty.helper';

export async function makeTargetFolder(targetDir: string): Promise<void> {
  // Проверяем, существует ли директория
  if (!isDirectoryEmpty(targetDir)) {
    const overwrite = await confirm(`Directory "${targetDir}" already exists. Overwrite?`, false);

    if (!overwrite) {
      error('Operation cancelled', null);
    }

    // Удаляем существующую директорию
    rmSync(targetDir, { recursive: true, force: true });
  }

  try {
    // Создаем директорию
    mkdirSync(targetDir, { recursive: true });
  } catch (err) {
    error('Error executing next steps', err);
  }
}
