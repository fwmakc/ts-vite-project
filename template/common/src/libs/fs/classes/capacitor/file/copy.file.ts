import { Filesystem, Directory } from '@capacitor/filesystem';

export async function copyFile(
  oldFilePath: string,
  newFilePath: string,
): Promise<void> {
  const data = await Filesystem.readFile({
    path: oldFilePath,
    directory: Directory.ExternalStorage,
  });

  await Filesystem.writeFile({
    path: newFilePath,
    data: data.data,
    directory: Directory.ExternalStorage,
  });
}
