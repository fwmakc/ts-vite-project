// import { readFile as read } from 'fs-extra';

export async function readBytesFile(fileName: string): Promise<Uint8Array> {
  // const { readFile: read } = await import('fs-extra');
  const { readFile: read } = await import('fs/promises');
  return await read(fileName);
}
