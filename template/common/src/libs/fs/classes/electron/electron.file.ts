import type { File } from '../../interfaces/file.interface';
import type { FileTypes } from '../../interfaces/file_types.interface';
import type { ListItem } from '../../interfaces/list.interface';

import { copyFile } from './file/copy.file';
import { getInfoFile } from './file/get_info.file';
import { readFile } from './file/read.file';
import { readBytesFile } from './file/read_bytes.file';
import { removeFile } from './file/remove.file';
import { renameFile } from './file/rename.file';
import { writeFile } from './file/write.file';
import { writeBytesFile } from './file/write_bytes.file';

export class ElectronFile implements File<string, string, string> {
  currentFile: string = '';

  constructor(file?: string) {
    if (file) {
      this.set(file);
    }
  }

  get(): string {
    return this.currentFile;
  }

  set(file: string): void {
    this.currentFile = file;
  }

  async copy(newFilePath: string): Promise<this> {
    await copyFile(this.currentFile, newFilePath);
    return new ElectronFile(newFilePath) as this;
  }

  async create(newFilePath: string): Promise<void> {
    this.currentFile = newFilePath;
    await this.write('');
  }

  async info(): Promise<ListItem> {
    return await getInfoFile(this.currentFile);
  }

  async read(): Promise<string> {
    return await readFile(this.currentFile);
  }

  async readBytes(): Promise<Uint8Array> {
    return await readBytesFile(this.currentFile);
  }

  async remove(): Promise<void> {
    await removeFile(this.currentFile);
    this.currentFile = '';
  }

  async rename(newFilePath: string): Promise<void> {
    await renameFile(this.currentFile, newFilePath);
    this.currentFile = newFilePath;
  }

  async write(content: string): Promise<void> {
    await writeFile(this.currentFile, content);
  }

  async writeBytes(content: Uint8Array): Promise<void> {
    await writeBytesFile(this.currentFile, content);
  }

  async saveDialog(
    _defaultDir?: string,
    _fileTypes?: FileTypes,
  ): Promise<void> {}

  async openDialog(
    _defaultDir?: string,
    _fileTypes?: FileTypes,
  ): Promise<void> {}
}
