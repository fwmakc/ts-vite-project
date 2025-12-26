import type { ListItem } from '../../../interfaces/list.interface';

export async function getInfoFile(
  fileHandle: FileSystemFileHandle | null,
): Promise<ListItem> {
  if (!fileHandle) {
    return {};
  }

  const fileInfo = await fileHandle?.getFile();

  console.log('-- fileInfo', fileInfo);

  // let type: ListItem['type'];
  // if (fileHandle.isFile) {
  //   type = 'file';
  // }
  // if (fileHandle.isDirectory) {
  //   type = 'dir';
  // }
  // if (fileHandle.isSymlink) {
  //   type = 'symlink';
  // }

  return {
    name: fileInfo.name,
    size: fileInfo.size,
    modifiedAt: new Date(fileInfo.lastModified),
  };
}
