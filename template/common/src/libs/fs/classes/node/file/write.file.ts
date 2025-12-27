import { writeFile as write } from 'fs-extra';

export async function writeFile(
  fileName: string,
  content: string,
): Promise<void> {
  await write(fileName, content, 'utf-8');
}
