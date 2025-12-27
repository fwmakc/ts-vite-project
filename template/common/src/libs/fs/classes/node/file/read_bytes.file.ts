// import { readFile as read } from 'fs-extra';

export async function readBytesFile(fileName: string): Promise<Uint8Array> {
  const { readFile: read } = await import('fs-extra');
  return await read(fileName);
}
