// import { readFile as read } from 'fs-extra';

export async function readFile(fileName: string): Promise<string> {
  const { readFile: read } = await import('fs-extra');
  return (await read(fileName, 'utf-8')) || '';
}
