import { Filesystem, Directory } from '@capacitor/filesystem';

export async function removeFile(fileName: string): Promise<void> {
  await Filesystem.deleteFile({
    path: fileName,
    directory: Directory.ExternalStorage,
  });
}
