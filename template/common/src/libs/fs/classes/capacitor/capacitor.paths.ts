import { Directory } from '@capacitor/filesystem';

import type { DefaultPaths } from '../../interfaces/default_paths.interface';

export class CapacitorPaths implements DefaultPaths {
  app?: unknown;
  cache?: unknown;
  data?: unknown;
  documents?: unknown;
  home?: unknown;

  constructor() {
    this.app = Directory.External;
    this.cache = Directory.Cache;
    this.data = Directory.Data;
    this.documents = Directory.Documents;
    this.home = Directory.ExternalStorage;
  }
}
