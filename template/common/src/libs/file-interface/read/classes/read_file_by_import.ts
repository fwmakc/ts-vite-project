import type { FileOptions } from '../../interfaces/file_options.interface';
import type { FileReader } from '../../interfaces/file_reader.interface';

export class ReadFileByImport implements FileReader {
  async read({ fileName }: FileOptions): Promise<FileOptions> {
    const module = await import(`${fileName}?raw`);

    return { content: module.default, fileName };
  }
}
