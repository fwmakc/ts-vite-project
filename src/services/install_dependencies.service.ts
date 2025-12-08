import { execSync } from 'child_process';

import { detectPackageManagers } from '../helpers/detect_package_managers.helper';
import { print } from '../helpers/print.helper';
import { select } from '../prompts/select.prompt';

export async function installDependencies(targetFolder: string): Promise<void> {
  try {
    // 1. Переходим в директорию проекта
    process.chdir(targetFolder);

    // 2. Автоматическое определение или выбор менеджера пакетов
    const packageManagers: string[] = detectPackageManagers();

    let selectedPackageManager = packageManagers[0];

    if (packageManagers.length > 1) {
      const packageManagerAnswer = await select(
        'Package manager',
        packageManagers,
      );

      selectedPackageManager = packageManagerAnswer;
    }

    print([
      `📦 Using package manager: ${selectedPackageManager}`,
      '📦 Installing dependencies...',
    ]);

    // 3. Устанавливаем зависимости
    execSync(`${selectedPackageManager} install`, { stdio: 'inherit' });
    print(['✅ Dependencies installed']);
  } catch (error) {
    console.error('❌ Error executing next steps', error);
  }
}
