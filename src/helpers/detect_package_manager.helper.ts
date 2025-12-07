import { execSync } from 'child_process';

export function detectPackageManager(): string {
  try {
    execSync('yarn --version', { stdio: 'ignore' });
    return 'yarn';
  } catch (error) {
    console.error('❌ Detect package manager error', error);
  }
  return 'npm';
}
