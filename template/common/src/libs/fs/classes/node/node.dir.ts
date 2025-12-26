import type { Dir } from '../../interfaces/dir.interface';
import type { ListOptions } from '../../interfaces/list.interface';

import { createDir } from './dir/create.dir';
import { removeDir } from './dir/remove.dir';
import { renameDir } from './dir/rename.dir';

export class NodeDir implements Dir<string, string> {
  currentDir?: string;

  constructor(dirPath?: string) {
    if (dirPath) {
      this.set(dirPath);
    }
  }

  get(): string | undefined {
    return this.currentDir;
  }

  set(dirPath: string): void {
    this.currentDir = dirPath;
  }

  async create(newDirPath: string): Promise<void> {
    await createDir(newDirPath);
    this.currentDir = newDirPath;
  }

  async list(_options?: ListOptions): Promise<string[]> {
    return await [];
  }

  async remove(): Promise<void> {
    await removeDir(this.currentDir!);
    this.currentDir = '';
  }

  async rename(newDirPath: string): Promise<void> {
    await renameDir(this.currentDir!, newDirPath);
    this.currentDir = newDirPath;
  }

  async selectDialog(_defaultDir?: string): Promise<void> {}
}
