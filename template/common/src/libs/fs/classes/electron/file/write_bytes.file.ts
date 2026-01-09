// import { writeFile as write } from 'fs-extra';

export async function writeBytesFile(
  fileName: string,
  content: Uint8Array,
): Promise<void> {
  // const { writeFile: write } = await import('fs-extra');
  const { writeFile: write } = await import('fs/promises');
  return await write(fileName, content);
}
