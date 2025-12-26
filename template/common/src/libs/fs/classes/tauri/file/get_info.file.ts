import { extname, basename, dirname } from '@tauri-apps/api/path';
import { stat } from '@tauri-apps/plugin-fs';

import type { ListItem } from '../../../interfaces/list.interface';

export async function getInfoFile(fileName: string): Promise<ListItem> {
  const fileInfo = await stat(fileName);

  let type: ListItem['type'];
  if (fileInfo.isFile) {
    type = 'file';
  }
  if (fileInfo.isDirectory) {
    type = 'dir';
  }
  if (fileInfo.isSymlink) {
    type = 'symlink';
  }

  const i = {
    extname: await extname(fileName),
    basename: await basename(fileName),
    dirname: await dirname(fileName),
  };
  console.log(i);

  return {
    path: fileName,
    size: fileInfo.size,

    type,

    modifiedAt: fileInfo.mtime || undefined,
    createdAt: fileInfo.birthtime || undefined,
  };
}
