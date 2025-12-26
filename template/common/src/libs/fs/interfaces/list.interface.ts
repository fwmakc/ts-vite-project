export interface ListOptions {
  mask?: string;
  sortBy?: 'name' | 'ext' | 'size' | 'date';
  order?: 'asc' | 'desc';
  limit?: number;
}

export interface ListItem {
  name?: string;
  fileName?: string;
  fileExtension?: string;
  meta?: string;
  type?: 'dir' | 'file' | 'symlink';
  path?: string;
  size?: number;
  modifiedAt?: Date;
  createdAt?: Date;
}
