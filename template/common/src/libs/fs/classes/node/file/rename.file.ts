// import { rename } from 'fs-extra';

export async function renameFile(
  oldFilePath: string,
  newFilePath: string,
): Promise<void> {
  const { rename } = await import('fs-extra');
  await rename(oldFilePath, newFilePath);
}
