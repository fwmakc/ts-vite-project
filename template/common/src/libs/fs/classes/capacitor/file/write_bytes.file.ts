import { Filesystem, Directory } from '@capacitor/filesystem';

export async function writeBytesFile(
  fileName: string,
  content: Uint8Array,
): Promise<void> {
  const base64 = arrayBufferToBase64(content);

  await Filesystem.writeFile({
    path: fileName,
    data: base64,
    directory: Directory.Data,
  });
}

function arrayBufferToBase64(buffer: Uint8Array): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(buffer).toString('base64');
  }

  let binary = '';
  const bytes = new Uint8Array(buffer);

  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }

  return btoa(binary);
}
