import { mkdir } from 'fs-extra';

export async function createDir(dirPath: string): Promise<void> {
  await mkdir(dirPath, { recursive: true });
}
