// import { rm } from 'fs-extra';

export async function removeDir(dirPath: string): Promise<void> {
  const { rm } = await import('fs-extra');
  await rm(dirPath, { recursive: true });
}
