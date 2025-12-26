export async function renameFile(
  fileHandle: FileSystemFileHandle | null,
  parentHandle: FileSystemDirectoryHandle | null,
  newName: string,
): Promise<FileSystemFileHandle | null> {
  if (!fileHandle || !parentHandle) {
    return null;
  }

  const file = await fileHandle.getFile();
  const content = await file.arrayBuffer();

  const newFileHandle = await parentHandle.getFileHandle(newName, {
    create: true,
  });

  const writable = await newFileHandle.createWritable();

  try {
    await writable.write(content);
  } finally {
    await writable.close();
  }

  await parentHandle.removeEntry(fileHandle.name);

  return newFileHandle;
}
