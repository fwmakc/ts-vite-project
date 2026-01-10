import { Directory } from '@capacitor/filesystem';

import type { DefaultPaths } from '../../interfaces/default_paths.interface';

export class CapacitorPaths implements DefaultPaths<Directory> {
  async app(): Promise<Directory> {
    return Directory.External;
  }

  async cache(): Promise<Directory> {
    return Directory.Cache;
  }

  async data(): Promise<Directory> {
    return Directory.Data;
  }

  async documents(): Promise<Directory> {
    return Directory.Documents;
  }

  async home(): Promise<Directory> {
    return Directory.ExternalStorage;
  }
}
