import { execSync } from 'child_process';

import type { IPackageAuthor } from '../interfaces/package_author.interface';

import { error } from './error.helper';
import { print } from './print.helper';

function sanitize(value: string | undefined): string {
  return String(value || '')
    .replaceAll('"', '')
    .trim();
}

export async function gitSetup(projectFolder: string, url: string, author: IPackageAuthor): Promise<void> {
  process.chdir(projectFolder);

  // Проверяем доступность git
  try {
    execSync('git --version', { stdio: 'pipe' });
  } catch (_err) {
    print([
      '⚠️  Git not found. Project is ready, but git setup was skipped.',
      '',
      'Manual steps:',
      '  git init -b main',
      `  git remote add origin ${url}`,
      '  git add -A',
      '  git commit -m "chore: initial commit"',
      '  git push -u origin main',
    ]);
    return;
  }

  print(['🐙 Setting up git...']);

  // Инициализируем репозиторий и делаем первый коммит
  try {
    try {
      execSync('git init -b main', { stdio: 'pipe' });
    } catch (_err) {
      execSync('git init', { stdio: 'pipe' });
      execSync('git checkout -B main', { stdio: 'pipe' });
    }

    execSync('git add -A', { stdio: 'pipe' });

    // Коммитим только если есть изменения (повторный запуск - не ошибка)
    const hasChanges = execSync('git status --porcelain', { stdio: 'pipe' }).toString().trim();

    if (hasChanges) {
      // Если identity не настроена - задаем локально из данных автора
      const email = execSync('git config user.email', { stdio: 'pipe' }).toString().trim();

      if (!email) {
        const name = sanitize(author.name);
        const mail = sanitize(author.email);

        if (name) {
          execSync(`git config user.name "${name}"`, { stdio: 'pipe' });
        }

        if (mail) {
          execSync(`git config user.email "${mail}"`, { stdio: 'pipe' });
        }
      }

      execSync('git commit -m "chore: initial commit"', { stdio: 'pipe' });
    }

    // Добавляем remote
    try {
      execSync(`git remote add origin "${url}"`, { stdio: 'pipe' });
    } catch (_err) {
      execSync(`git remote set-url origin "${url}"`, { stdio: 'pipe' });
    }
  } catch (err) {
    error('Error git init or commit', err);
  }

  // Проверяем удаленный репозиторий (любой хостинг)
  let remoteBranch = '';

  try {
    const symref = execSync('git ls-remote --symref origin HEAD', { stdio: 'pipe' }).toString();
    const match = symref.match(/ref:\s*refs\/heads\/(\S+)/);

    if (match) {
      remoteBranch = match[1] ?? '';
    }
  } catch (_err) {
    print(['⚠️  Remote repository not found or not accessible.', `If it does not exist, create it first: ${url}`]);
  }

  // Если в репозитории что-то есть - забираем и мержим, конфликты решает наш проект
  if (remoteBranch) {
    try {
      execSync('git fetch origin', { stdio: 'pipe' });
      execSync(`git merge origin/${remoteBranch} --allow-unrelated-histories -X ours`, { stdio: 'pipe' });
      print([`✅ Merged existing ${remoteBranch} branch`]);
    } catch (_err) {
      print([
        '⚠️  Failed to merge existing repository content.',
        'Resolve conflicts manually, then run:',
        '  git add -A',
        '  git commit -m "merge existing repository"',
        `  git push -u origin ${remoteBranch}`,
      ]);
      return;
    }
  }

  // Пушим в репозиторий
  try {
    execSync('git push -u origin main', { stdio: 'inherit' });
    print([`✅ Project pushed to ${url}`]);
  } catch (_err) {
    print([
      '⚠️  Push failed. Check access rights and repository url.',
      '',
      'Manual steps:',
      `  git remote add origin ${url}`,
      '  git push -u origin main',
    ]);
  }
}
