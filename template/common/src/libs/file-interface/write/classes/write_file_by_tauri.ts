import { homeDir } from '@tauri-apps/api/path';
import { save } from '@tauri-apps/plugin-dialog';
import { writeTextFile } from '@tauri-apps/plugin-fs';

import { convertFileTypesToTauri } from '../../helpers/convert_file_types_to_tauri';
import type { FileOptions } from '../../interfaces/file_options.interface';
import type { FileWriter } from '../../interfaces/file_writer.interface';

export class WriteFileByTauri implements FileWriter {
  async write({
    content,
    fileName,
    fileTypes,
  }: FileOptions): Promise<FileOptions> {
    console.log('-- fileName before', fileName);

    const filters = convertFileTypesToTauri(fileTypes);

    if (!fileName) {
      fileName = (await save({
        // defaultPath: fileName,
        defaultPath: await homeDir(),
        filters,
      })) as string;
    }

    console.log('-- fileName after', fileName);

    const res = await writeTextFile(fileName, content!)
      .then(r => {
        console.log('-- r', r);
        return r;
      })
      .catch(e => {
        console.log('-- e', e);
      });

    console.log('-- res', res);

    return { fileName };
  }
}
