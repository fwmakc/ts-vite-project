import { open } from '@tauri-apps/plugin-dialog';
import { readTextFile } from '@tauri-apps/plugin-fs';

import { convertFileTypesToTauri } from '../../helpers/convert_file_types_to_tauri';
import type { FileOptions } from '../../interfaces/file_options.interface';
import type { FileReader } from '../../interfaces/file_reader.interface';

export class ReadFileByTauri implements FileReader {
  async read({ fileName, fileTypes }: FileOptions): Promise<FileOptions> {
    const filters = convertFileTypesToTauri(fileTypes);

    if (!fileName) {
      fileName = (await open({
        multiple: false,
        filters,
      })) as string;
    }

    const content = (await readTextFile(fileName)) || '';

    return {
      fileName,
      content,
    };
  }
}
