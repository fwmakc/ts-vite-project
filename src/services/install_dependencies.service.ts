import { execSync } from 'child_process';

import { detectPackageManager } from '../helpers/detect_package_manager.helper';
import { print } from '../helpers/print.helper';
import { question } from '../helpers/question.helper';

export async function installDependencies(
  targetFolder: string,
  silent = false,
): Promise<void> {
  print(['', '🔧 Executing next steps...', '']);

  try {
    // 1. Переходим в директорию проекта
    process.chdir(targetFolder);
    print(['📁 Changed to project directory']);

    // 2. Автоматическое определение или выбор менеджера пакетов
    const detectedManager: string = detectPackageManager();
    let selectedPackageManager = detectedManager;

    if (!silent) {
      const packageManagerAnswer: string = (
        (await question(
          `Package manager (npm/yarn, default: ${detectedManager}): `,
        )) ||
        detectedManager ||
        ''
      ).toLowerCase();

      const validPackageManagers = ['npm', 'yarn'];

      selectedPackageManager = validPackageManagers.includes(
        packageManagerAnswer,
      )
        ? packageManagerAnswer
        : detectedManager;
    }

    print([`📦 Using package manager: ${selectedPackageManager}`]);

    // 3. Устанавливаем зависимости
    print(['📦 Installing dependencies...']);
    execSync(`${selectedPackageManager} install`, { stdio: 'inherit' });
    print(['✅ Dependencies installed']);
  } catch (error) {
    console.error('❌ Error executing next steps', error);
  }
}
