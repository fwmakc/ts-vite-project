export async function writeBytesFile(
  fileHandle: FileSystemFileHandle | null,
  content: Uint8Array,
): Promise<void> {
  if (!fileHandle) {
    return;
  }

  const chunkSize: number = 65536;

  const writable = await fileHandle.createWritable();

  try {
    if (content.length <= chunkSize) {
      await writable.write(content);
    } else {
      let offset = 0;
      while (offset < content.length) {
        const chunk = content.slice(offset, offset + chunkSize);
        await writable.write(chunk);
        offset += chunkSize;
      }
    }
  } finally {
    await writable.close();
  }
}
