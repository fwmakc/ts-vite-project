// import { rename } from 'fs-extra';

export async function renameDir(
  oldPath: string,
  newPath: string,
): Promise<void> {
  const { rename } = await import('fs-extra');
  await rename(oldPath, newPath);
}
