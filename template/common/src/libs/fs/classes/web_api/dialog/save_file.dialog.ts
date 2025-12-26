import type { FileTypes } from '../../../interfaces/file_types.interface';

import { convertFileTypesToWebApi } from './helpers/convert_file_types_to_web_api';

export async function saveFileDialog(
  defaultDir?: FileSystemDirectoryHandle | null,
  fileTypes?: FileTypes,
): Promise<FileSystemFileHandle> {
  let types;

  if (fileTypes) {
    types = convertFileTypesToWebApi(fileTypes);
  }

  return (await (window as any).showSaveFilePicker({
    startIn: defaultDir || undefined,
    types,
  })) as FileSystemFileHandle;
}
