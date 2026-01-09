import {
  appCacheDir,
  appDataDir,
  documentDir,
  homeDir,
  resourceDir,
} from '@tauri-apps/api/path';

import type { DefaultPaths } from '../../interfaces/default_paths.interface';

export class TauriPaths implements DefaultPaths {
  app?: unknown;
  cache?: unknown;
  data?: unknown;
  documents?: unknown;
  home?: unknown;

  constructor() {
    this.set();
  }

  async set(): Promise<void> {
    this.app = await resourceDir();
    this.cache = await appCacheDir();
    this.data = await appDataDir();
    this.documents = await documentDir();
    this.home = await homeDir();
  }
}
