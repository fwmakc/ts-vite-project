import { rename } from 'fs-extra';

export async function renameDir(
  oldPath: string,
  newPath: string,
): Promise<void> {
  await rename(oldPath, newPath);
}
