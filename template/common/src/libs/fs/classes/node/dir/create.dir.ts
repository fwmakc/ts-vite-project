// import { mkdir } from 'fs-extra';

export async function createDir(dirPath: string): Promise<void> {
  const { mkdir } = await import('fs-extra');
  await mkdir(dirPath, { recursive: true });
}
