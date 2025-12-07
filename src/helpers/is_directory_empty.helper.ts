import { existsSync, readdirSync, statSync } from 'fs';

export function isDirectoryEmpty(dirPath: string): boolean {
  try {
    if (!existsSync(dirPath)) {
      return true;
    }

    const stats = statSync(dirPath);
    if (!stats.isDirectory()) {
      console.error(`❌ Path is not a directory: ${dirPath}`);
      return false;
    }

    const files = readdirSync(dirPath);
    return files.length === 0;
  } catch (error) {
    console.error('❌ Error checking directory', error);
    return false;
  }
}
