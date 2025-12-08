import { mkdirSync, rmSync } from 'fs';

import { isDirectoryEmpty } from '../helpers/is_directory_empty.helper';
import { confirm } from '../prompts/confirm.prompt';

export async function makeTargetFolder(targetDir: string): Promise<void> {
  // Проверяем, существует ли директория
  if (!isDirectoryEmpty(targetDir)) {
    const overwrite = await confirm(
      `Directory "${targetDir}" already exists. Overwrite?`,
    );

    if (!overwrite) {
      console.error('❌ Operation cancelled');
      return;
    }

    // Удаляем существующую директорию
    rmSync(targetDir, { recursive: true, force: true });
  }

  try {
    // Создаем директорию
    mkdirSync(targetDir, { recursive: true });
  } catch (error) {
    console.error('❌ Error executing next steps', error);
    return;
  }
}
