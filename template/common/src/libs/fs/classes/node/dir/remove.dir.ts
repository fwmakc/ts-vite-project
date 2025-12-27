import { rm } from 'fs-extra';

export async function removeDir(dirPath: string): Promise<void> {
  await rm(dirPath, { recursive: true });
}
