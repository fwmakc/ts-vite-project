import { copy } from 'fs-extra';

export async function copyDir(
  oldFilePath: string,
  newFilePath: string,
): Promise<void> {
  await copy(oldFilePath, newFilePath);
}
