import type { Dir } from '../../interfaces/dir.interface';
import type { ListOptions } from '../../interfaces/list.interface';

import { selectDirDialog } from './dialog/select_dir.dialog';

export class WebApiDir implements Dir<
  FileSystemDirectoryHandle,
  FileSystemFileHandle
> {
  currentDir?: FileSystemDirectoryHandle;

  constructor(dir?: FileSystemDirectoryHandle) {
    if (dir) {
      this.set(dir);
    }
  }

  get(): FileSystemDirectoryHandle | undefined {
    return this.currentDir;
  }

  set(dir: FileSystemDirectoryHandle): void {
    this.currentDir = dir;
  }

  async copy(newDir: FileSystemDirectoryHandle): Promise<this> {
    return new WebApiDir(newDir) as this;
  }

  async create(newDir: FileSystemDirectoryHandle): Promise<void> {
    this.currentDir = newDir;
  }

  async list(_options?: ListOptions): Promise<FileSystemFileHandle[]> {
    return await [];
  }

  async remove(): Promise<void> {
    this.currentDir = undefined;
  }

  async rename(newDir: FileSystemDirectoryHandle): Promise<void> {
    this.currentDir = newDir;
  }

  async size(): Promise<number> {
    return 0;
  }

  async selectDialog(): Promise<FileSystemDirectoryHandle> {
    return await selectDirDialog(this.currentDir);
  }
}
