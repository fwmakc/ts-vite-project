import type { FileTypes } from './file_types.interface';
import type { ListItem } from './list.interface';

export interface File<FileDescriptor, DirDescriptor, Content> {
  currentFile?: FileDescriptor;

  get(): FileDescriptor | undefined;
  set(file: FileDescriptor): void;

  copy(newFile: FileDescriptor): this | Promise<this>;
  create(newFile: FileDescriptor): void;
  info(): ListItem | Promise<ListItem>;
  read(): Content | Promise<Content>;
  readBytes(): Uint8Array | Promise<Uint8Array>;
  rename(newFile: FileDescriptor): void;
  remove(): void;
  write(content: Content): void;
  writeBytes(content: Uint8Array): void;

  saveDialog(defaultDir?: DirDescriptor, fileTypes?: FileTypes): void;
  openDialog(defaultDir?: DirDescriptor, fileTypes?: FileTypes): void;
}
