import { Filesystem, Directory } from '@capacitor/filesystem';

import type { ListItem } from '../../../interfaces/list.interface';

export async function getInfoFile(fileName: string): Promise<ListItem> {
  const fileInfo = await Filesystem.stat({
    path: fileName,
    directory: Directory.Documents,
  });

  let type: ListItem['type'];
  if (fileInfo.type === 'file') {
    type = 'file';
  }
  if (fileInfo.type === 'directory') {
    type = 'dir';
  }

  return {
    path: fileName,
    size: fileInfo.size,

    type,

    modifiedAt: fileInfo?.mtime ? new Date(fileInfo.mtime) : undefined,
    createdAt: fileInfo?.ctime ? new Date(fileInfo.ctime) : undefined,
  };
}
