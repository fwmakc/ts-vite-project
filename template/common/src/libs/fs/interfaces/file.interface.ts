import type { FileTypes } from './file_types.interface';
import type { ListItem } from './list.interface';

export interface File<Descriptor, Content> {
  currentFile: Descriptor;

  get(): Descriptor;
  set(file: Descriptor): void;

  copy(
    newFilePath: string,
  ): File<Descriptor, Content> | Promise<File<Descriptor, Content>>;
  create(filePath: string): void;
  info(): ListItem | Promise<ListItem>;
  read(): Content | Promise<Content>;
  readBytes(): ArrayBufferLike | Promise<ArrayBufferLike>;
  rename(newFilePath: string): void;
  remove(): void;
  write(content: Content): void;
  writeBytes(content: ArrayBufferLike): void;

  saveDialog(defaultDir?: string, fileTypes?: FileTypes): void;
  openDialog(defaultDir?: string, fileTypes?: FileTypes): void;
}
