// import { copyFile as copy } from 'fs-extra';

export async function copyFile(
  oldFilePath: string,
  newFilePath: string,
): Promise<void> {
  const { copyFile: copy } = await import('fs-extra');
  await copy(oldFilePath, newFilePath);
}
