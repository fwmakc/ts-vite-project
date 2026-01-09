import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export async function writeFile(
  fileName: string,
  content: string,
): Promise<void> {
  await Filesystem.writeFile({
    path: fileName,
    data: content,
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
}
