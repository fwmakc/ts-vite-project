import { readFile as read } from 'fs-extra';

export async function readBytesFile(fileName: string): Promise<Uint8Array> {
  return await read(fileName);
}
