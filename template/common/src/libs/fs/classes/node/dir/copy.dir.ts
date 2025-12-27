// import { copy } from 'fs-extra';

export async function copyDir(
  oldFilePath: string,
  newFilePath: string,
): Promise<void> {
  const { copy } = await import('fs-extra');
  await copy(oldFilePath, newFilePath);
}
