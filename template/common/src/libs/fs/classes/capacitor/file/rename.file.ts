import { Filesystem, Directory } from '@capacitor/filesystem';

export async function renameFile(
  oldFilePath: string,
  newFilePath: string,
): Promise<void> {
  await Filesystem.rename({
    from: oldFilePath,
    to: newFilePath,
    directory: Directory.ExternalStorage,
  });
}
