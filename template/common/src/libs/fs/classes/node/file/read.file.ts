import { readFile as read } from 'fs-extra';

export async function readFile(fileName: string): Promise<string> {
  return (await read(fileName, 'utf-8')) || '';
}
