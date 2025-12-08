import { execSync } from 'child_process';

import { error } from './error.helper';

export function detectPackageManagers(): string[] {
  const packageManagers = ['npm'];

  try {
    execSync('yarn --version', { stdio: 'ignore' });
    packageManagers.unshift('yarn');
  } catch (err) {
    error('Detect package manager error', err);
  }

  return packageManagers;
}
