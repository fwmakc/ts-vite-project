import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export async function readFile(fileName: string): Promise<string> {
  const result = await Filesystem.readFile({
    path: fileName,
    directory: Directory.ExternalStorage,
    encoding: Encoding.UTF8,
  });

  return (result?.data as string) || '';
}
