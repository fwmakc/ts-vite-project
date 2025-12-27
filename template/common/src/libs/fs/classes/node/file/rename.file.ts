import { rename } from 'fs-extra';

export async function renameFile(
  oldFilePath: string,
  newFilePath: string,
): Promise<void> {
  await rename(oldFilePath, newFilePath);
}
