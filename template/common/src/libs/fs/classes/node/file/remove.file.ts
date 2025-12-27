// import { unlink } from 'fs-extra';

export async function removeFile(fileName: string): Promise<void> {
  const { unlink } = await import('fs-extra');
  await unlink(fileName);
}
