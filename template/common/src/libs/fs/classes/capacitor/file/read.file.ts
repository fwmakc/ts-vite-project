import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export async function readFile(
  fileName: string,
  dir?: string,
): Promise<string> {
  let directory;

  if (dir === 'documents') {
    directory = Directory.Documents;
  }
  if (dir === 'external') {
    directory = Directory.External;
  }
  if (dir === 'data') {
    directory = Directory.Data;
  }
  if (dir === 'storage') {
    directory = Directory.ExternalStorage;
  }

  const result = await Filesystem.readFile({
    path: fileName,
    directory,
    encoding: Encoding.UTF8,
  });

  return (result?.data as string) || '';
}
