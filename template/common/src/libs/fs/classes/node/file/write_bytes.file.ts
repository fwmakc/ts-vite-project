import { writeFile as write } from 'fs-extra';

export async function writeBytesFile(
  fileName: string,
  content: Uint8Array,
): Promise<void> {
  return await write(fileName, content);
}
