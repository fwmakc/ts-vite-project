import type { File } from '../../interfaces/file.interface';
import type { FileTypes } from '../../interfaces/file_types.interface';
import type { ListItem } from '../../interfaces/list.interface';

import { openFileDialog } from './dialog/open_file.dialog';
import { saveFileDialog } from './dialog/save_file.dialog';
import { selectDirDialog } from './dialog/select_dir.dialog';
import { getInfoFile } from './file/get_info.file';
import { readFile } from './file/read.file';
import { readBytesFile } from './file/read_bytes.file';
import { renameFile } from './file/rename.file';
import { writeFile } from './file/write.file';
import { writeBytesFile } from './file/write_bytes.file';

export class WebApiFile implements File<
  FileSystemFileHandle,
  FileSystemDirectoryHandle,
  string
> {
  currentFile?: FileSystemFileHandle = undefined;

  constructor(file?: FileSystemFileHandle) {
    if (file) {
      this.set(file);
    }
  }

  get(): FileSystemFileHandle | undefined {
    return this.currentFile;
  }

  set(file: FileSystemFileHandle): void {
    this.currentFile = file;
  }

  async copy(newFile: FileSystemFileHandle): Promise<this> {
    const content = await this.readBytes();
    const copiedFile = new WebApiFile() as this;
    copiedFile.set(newFile);
    await copiedFile.writeBytes(content);
    return copiedFile;
  }

  async create(newFile: FileSystemFileHandle): Promise<void> {
    await this.set(newFile);
    await this.write('');
  }

  async info(): Promise<ListItem> {
    return await getInfoFile(this.currentFile!);
  }

  async read(): Promise<string> {
    return await readFile(this.currentFile!);
  }

  async readBytes(): Promise<Uint8Array> {
    return await readBytesFile(this.currentFile!);
  }

  async remove(): Promise<void> {
    if (!this.currentFile) {
      return;
    }
    const currentDir = await selectDirDialog();
    await currentDir?.removeEntry(this.currentFile.name);
    this.currentFile = undefined;
  }

  async rename(newFile: FileSystemFileHandle): Promise<void> {
    this.currentFile = await renameFile(this.currentFile!, newFile);
  }

  async write(content: string): Promise<void> {
    await writeFile(this.currentFile!, content);
  }

  async writeBytes(content: Uint8Array): Promise<void> {
    await writeBytesFile(this.currentFile!, content);
  }

  async saveDialog(
    defaultDir?: FileSystemDirectoryHandle,
    fileTypes?: FileTypes,
  ): Promise<void> {
    this.currentFile = await saveFileDialog(defaultDir, fileTypes);
  }

  async openDialog(
    defaultDir?: FileSystemDirectoryHandle,
    fileTypes?: FileTypes,
  ): Promise<void> {
    this.currentFile = await openFileDialog(defaultDir, fileTypes);
  }
}
