// import { stat } from 'fs-extra';

import type { ListItem } from '../../../interfaces/list.interface';

export async function getInfoFile(fileName: string): Promise<ListItem> {
  const { stat } = await import('fs-extra');

  const fileInfo = await stat(fileName);

  let type: ListItem['type'];
  if (fileInfo.isFile()) {
    type = 'file';
  }
  if (fileInfo.isDirectory()) {
    type = 'dir';
  }
  if (fileInfo.isSymbolicLink()) {
    type = 'symlink';
  }

  return {
    path: fileName,
    size: fileInfo.size,

    type,

    modifiedAt: fileInfo.mtime || undefined,
    createdAt: fileInfo.birthtime || undefined,
  };
}
