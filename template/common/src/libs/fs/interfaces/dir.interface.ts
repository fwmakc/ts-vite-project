import type { ListOptions } from './list.interface';

export interface Dir {
  path: string;

  get(): string;
  set(path: string): void;

  create(path: string): void;
  list(options?: ListOptions): string[] | Promise<string[]>;
  remove(): void;
  rename(newPath: string): void;

  selectDialog(defaultDir?: string): void;
}
