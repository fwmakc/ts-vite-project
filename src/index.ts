import path from 'path';

import { copyProject } from './helpers/copy_project.helper';
import { error } from './helpers/error.helper';
import { installDependencies } from './helpers/install_dependencies.helper';
import { makeTargetFolder } from './helpers/make_target_folder.helper';
import { print } from './helpers/print.helper';
import { updateTauri } from './helpers/update.tauri';
import { updatePackage } from './package/update.package';
import { librariesSelect } from './select/libraries.select';
import { runtimeSelect } from './select/runtime.select';
import { valuesSelect } from './select/values.select';

async function main(): Promise<void> {
  print([
    '🚀 Creating TypeScript + Vite Project',
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

    const projectFolder = path.resolve(values.name);
    const sourceFolder = path.resolve(__dirname, '..');

    // Проверяем и создаем каталог проекта
    await makeTargetFolder(projectFolder);

    // Копируем файлы проекта
    await copyProject(sourceFolder, projectFolder, libraries.libraries!);

    // Обновляем package.json
    updatePackage(projectFolder, values, libraries);

    // Обновляем tauri.config.json
    updateTauri(projectFolder, values, libraries.libraries!);

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
