import * as path from 'path';

import type { DefaultPaths } from '../../interfaces/default_paths.interface';

export class ElectronPaths implements DefaultPaths {
  app?: unknown;
  cache?: unknown;
  data?: unknown;
  documents?: unknown;
  home?: unknown;

  constructor() {
    this.set();
  }

  async set(): Promise<void> {
    this.app = await (window as any).electronAPI?.getPath('assets');

    const userData = await (window as any).electronAPI?.getPath('userData');
    this.cache = path.join(userData, 'cache');
    this.data = path.join(userData, 'data');

    this.documents = await (window as any).electronAPI?.getPath('documents');
    this.home = await (window as any).electronAPI?.getPath('home');
  }
}
