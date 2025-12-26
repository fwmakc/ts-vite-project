import type { Dir } from '../../interfaces/dir.interface';
import type { ListOptions } from '../../interfaces/list.interface';

import { selectDirDialog } from './dialog/select_dir.dialog';
import { createDir } from './dir/create.dir';
import { removeDir } from './dir/remove.dir';
import { renameDir } from './dir/rename.dir';

export class WebApiDir implements Dir {
  path: string = '';

  constructor(path?: string) {
    if (path) {
      this.set(path);
    }
  }

  get(): string {
    return this.path;
  }

  set(path: string): void {
    this.path = path;
  }

  async create(path: string): Promise<void> {
    await createDir(path);
    this.path = path;
  }

  async list(_options?: ListOptions): Promise<string[]> {
    return await [];
  }

  async remove(): Promise<void> {
    await removeDir(this.path);
    this.path = '';
  }

  async rename(newPath: string): Promise<void> {
    await renameDir(this.path, newPath);
    this.path = newPath;
  }

  async selectDialog(defaultDir?: string): Promise<void> {
    this.path = await selectDirDialog(defaultDir);
  }
}
