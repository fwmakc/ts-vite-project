import type { DefaultPaths } from '../../interfaces/default_paths.interface';

export class WebApiPaths implements DefaultPaths<FileSystemDirectoryHandle> {
  async app(): Promise<FileSystemDirectoryHandle> {
    const app = new FileSystemDirectoryHandle();
    return await app.getDirectoryHandle('');
  }

  async cache(): Promise<FileSystemDirectoryHandle> {
    const cache = new FileSystemDirectoryHandle();
    return await cache.getDirectoryHandle('');
  }

  async data(): Promise<FileSystemDirectoryHandle> {
    const data = new FileSystemDirectoryHandle();
    return await data.getDirectoryHandle('');
  }

  async documents(): Promise<FileSystemDirectoryHandle> {
    const documents = new FileSystemDirectoryHandle();
    return await documents.getDirectoryHandle('documents');
  }

  async home(): Promise<FileSystemDirectoryHandle> {
    const home = new FileSystemDirectoryHandle();
    return await home.getDirectoryHandle('/');
  }
}
