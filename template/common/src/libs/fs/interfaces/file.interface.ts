import type { FileTypes } from './file_types.interface';
import type { ListItem } from './list.interface';

export interface File<Descriptor, Content> {
  currentFile: Descriptor;

  get(): Descriptor;
  set(file: Descriptor): void;

  copy(newFilePath: string): this | Promise<this>;
  create(filePath: string): void;
  info(): ListItem | Promise<ListItem>;
  read(): Content | Promise<Content>;
  readBytes(): Uint8Array | Promise<Uint8Array>;
  rename(newFilePath: string): void;
  remove(): void;
  write(content: Content): void;
  writeBytes(content: Uint8Array): void;

  saveDialog(defaultDir?: string, fileTypes?: FileTypes): void;
  openDialog(defaultDir?: string, fileTypes?: FileTypes): void;
}
