export async function selectDirDialog(
  defaultDir?: string,
): Promise<FileSystemDirectoryHandle> {
  return (await (window as any).showDirectoryPicker({
    startIn: defaultDir,
  })) as FileSystemDirectoryHandle;
}
