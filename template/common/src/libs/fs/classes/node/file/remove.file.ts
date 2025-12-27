import { unlink } from 'fs-extra';

export async function removeFile(fileName: string): Promise<void> {
  await unlink(fileName);
}
