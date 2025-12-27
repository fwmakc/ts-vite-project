import { readFile } from './read.file';

export async function readBytesFile(fileName: string): Promise<Uint8Array> {
  const data = await readFile(fileName);
  const encoder = new TextEncoder();
  return encoder.encode(data);
}
