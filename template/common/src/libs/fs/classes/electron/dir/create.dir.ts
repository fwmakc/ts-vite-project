// import { mkdir } from 'fs-extra';

export async function createDir(dirPath: string): Promise<void> {
  // const { mkdir } = await import('fs-extra');
  const { mkdir } = await import('fs/promises');
  await mkdir(dirPath, { recursive: true });
}
