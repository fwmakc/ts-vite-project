import { mkdirSync, rmSync } from 'fs';

import { isDirectoryEmpty } from '../helpers/is_directory_empty.helper';
import { print } from '../helpers/print.helper';
import { question } from '../helpers/question.helper';

export async function makeTargetFolder(targetDir: string): Promise<void> {
  // Проверяем, существует ли директория
  if (!isDirectoryEmpty(targetDir)) {
    const overwrite = (
      await question(
        `Directory "${targetDir}" already exists. Overwrite? (y/N): `,
      )
    ).trim();

    if (overwrite.toLowerCase() !== 'y') {
      print(['❌ Operation cancelled']);
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
