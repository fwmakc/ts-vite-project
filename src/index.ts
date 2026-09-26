import path from 'path';

import { backupProject } from './helpers/backup_project.helper';
import { copyProject } from './helpers/copy_project.helper';
import { error } from './helpers/error.helper';
import { installDependencies } from './helpers/install_dependencies.helper';
import { makeTargetFolder } from './helpers/make_target_folder.helper';
import { print } from './helpers/print.helper';
import { updatePackage } from './helpers/update_package.helper';
import { updatePort } from './helpers/update_port.helper';
import { updateTauri } from './helpers/update_tauri.helper';
import { librariesSelect } from './select/libraries.select';
import { portSelect } from './select/port.select';
import { runtimeSelect } from './select/runtime.select';
import { valuesSelect } from './select/values.select';

async function main(): Promise<void> {
  print([
    '🚀 Creating TypeScript Project',
    '(will be installed in project name folder)',
    '',
    '⚠️  keys:',
    'arrows - select',
    '[enter] - confirm',
    '[esc] - abort and exit',
    '[space] - switch or clear',
    '[tab] - edit default value',
  ]);

  try {
    const values = await valuesSelect();
    const runtime = await runtimeSelect();
    const libraries = await librariesSelect(runtime);
    const port = await portSelect(libraries.libraries as string[]);

    const projectFolder = path.resolve(values.name);
    const sourceFolder = path.resolve(__dirname, '..');

    // Проверяем и создаем каталог проекта
    await makeTargetFolder(projectFolder);

    // Бэкапим существующие файлы проекта
    await backupProject(projectFolder);

    // Копируем файлы проекта
    await copyProject(sourceFolder, projectFolder, libraries.libraries as string[]);

    // Обновляем package.json
    updatePackage(projectFolder, values, libraries);

    // Обновляем tauri.config.json
    updateTauri(projectFolder, values, libraries.libraries as string[]);

    // Обновляем порт dev-сервера
    updatePort(projectFolder, port, libraries.libraries as string[]);

    // Делаем установку зависимостей
    await installDependencies(projectFolder, runtime, libraries);

    print([
      '✅ Project created successfully!',
      '',
      'Next steps:',
      `📁 cd ${values.name}`,
      `⭐ ${runtime.run} dev`,
      '',
      'Happy coding! 👋',
    ]);
  } catch (err) {
    error('Error creating project', err);
  }
}

main().catch(console.error);
