import { execSync } from 'child_process';

export function detectPackageManagers(): string[] {
  const packageManagers = ['npm'];

  try {
    execSync('yarn --version', { stdio: 'ignore' });
    packageManagers.unshift('yarn');
  } catch (error) {
    console.error('❌ Detect package manager error', error);
  }

  return packageManagers;
}
