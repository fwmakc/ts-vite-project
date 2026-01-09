// import { copy } from 'fs-extra';

export async function copyDir(
  oldFilePath: string,
  newFilePath: string,
): Promise<void> {
  // const { copy } = await import('fs-extra');
  const { copyFile: copy } = await import('fs/promises');
  await copy(oldFilePath, newFilePath);
}
