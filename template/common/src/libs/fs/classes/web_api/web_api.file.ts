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

export class WebApiFile implements File<FileSystemFileHandle | null, string> {
  currentFile: FileSystemFileHandle | null = null;
  currentDir: FileSystemDirectoryHandle | null = null;

  constructor(file?: FileSystemFileHandle) {
    if (file) {
      this.set(file);
    }
  }

  get(): FileSystemFileHandle | null {
    return this.currentFile;
  }

  set(file: FileSystemFileHandle | null): void {
    this.currentFile = file;
  }

  async copy(newFilePath: string): Promise<this> {
    const content = await this.readBytes();
    const copiedFile = new WebApiFile() as this;
    await copiedFile.saveDialog(newFilePath);
    await copiedFile.writeBytes(content);
    return copiedFile;
  }

  async create(filePath: string): Promise<void> {
    await this.saveDialog(filePath);
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
    if (!this.currentFile) {
      return;
    }
    await this.setCurrentDir();
    await this.currentDir?.removeEntry(this.currentFile.name);
    this.currentFile = null;
  }

  async rename(newFilePath: string): Promise<void> {
    await this.setCurrentDir();
    this.currentFile = await renameFile(
      this.currentFile,
      this.currentDir,
      newFilePath,
    );
  }

  async write(content: string): Promise<void> {
    await this.setCurrentDir();
    await writeFile(this.currentFile, content);
  }

  async writeBytes(content: Uint8Array): Promise<void> {
    await this.setCurrentDir();
    await writeBytesFile(this.currentFile, content);
  }

  async saveDialog(defaultDir?: string, fileTypes?: FileTypes): Promise<void> {
    await this.setCurrentDir(defaultDir);
    this.currentFile = await saveFileDialog(this.currentDir, fileTypes);
  }

  async openDialog(defaultDir?: string, fileTypes?: FileTypes): Promise<void> {
    await this.setCurrentDir(defaultDir);
    this.currentFile = await openFileDialog(this.currentDir, fileTypes);
  }

  private async setCurrentDir(path?: string): Promise<void> {
    if (!this.currentDir) this.currentDir = await selectDirDialog(path);
  }
}
