import path from 'path';

import { rl } from './consts/rl.const';
import { print } from './helpers/print.helper';
import { question } from './helpers/question.helper';
import { updatePackageJson } from './helpers/update_package_json.helper';
import { copyProject } from './services/copy_project.service';
import { installDependencies } from './services/install_dependencies.service';
import { makeTargetFolder } from './services/make_target_folder.service';
import { preparePackageValues } from './services/prepare_package_values.service';

async function main(): Promise<void> {
  print([
    '🚀 Creating TypeScript + Vite Project',
    '(will be installed in project name folder)',
    '',
  ]);

  // Парсим аргументы командной строки
  const args = process.argv.slice(2);

  const packageValues = await preparePackageValues(args);

  const projectFolder = path.resolve(packageValues.name);

  // Проверяем и создаем каталог проекта
  await makeTargetFolder(projectFolder);

  try {
    // Копируем файлы проекта
    copyProject(projectFolder);

    // Обновляем package.json
    updatePackageJson(projectFolder, packageValues);

    print(['', '✅ Project created successfully!']);

    // Запрашиваем установку зависимостей
    const executeSteps = (
      await question('\nInstall dependencies? (y/N): ')
    ).trim();

    if (executeSteps.toLowerCase() === 'y') {
      await installDependencies(projectFolder);
    }

    // Переходим к Next steps
    print([
      '',
      'Next steps:',
      `📁 cd ${packageValues.name}`,
      '📦 npm install',
      '⭐ npm run dev',
      '',
      'Happy coding! 👋',
    ]);
  } catch (error) {
    console.error('❌ Error creating project:', error);
  } finally {
    rl.close();
  }
}

main().catch(console.error);
