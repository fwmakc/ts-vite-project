import type { ListItem } from '../../../interfaces/list.interface';

export async function getInfoDir(
  dirHandle?: FileSystemDirectoryHandle,
): Promise<ListItem> {
  if (!dirHandle) {
    return {};
  }

  let stats = '';

  try {
    stats = JSON.stringify(dirHandle);
  } catch (e) {
    console.log(e);
  }

  return {
    name: dirHandle.name,
    path: '',
    fullPath: '',
    type: 'dir',
    size: 0,

    stats,
  };
}
