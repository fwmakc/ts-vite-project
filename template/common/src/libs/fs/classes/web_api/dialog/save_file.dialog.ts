import type { FileTypes } from '../../../interfaces/file_types.interface';

import { convertFileTypesToWebApi } from './helpers/convert_file_types_to_web_api';

export async function saveFileDialog(
  defaultDir?: string | null,
  fileTypes?: FileTypes,
): Promise<FileSystemFileHandle> {
  let types;

  if (fileTypes) {
    types = convertFileTypesToWebApi(fileTypes);
  }

  const file = (await (window as any).showSaveFilePicker({
    startIn: defaultDir || undefined,
    types,
  })) as FileSystemFileHandle;

  return file;
}
