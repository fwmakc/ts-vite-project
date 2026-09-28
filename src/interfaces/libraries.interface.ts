import type { ILibrariesParams } from './libraries_params.interface';

export interface ILibraries {
  libraries?: string[];
  template?: string;
  main?: string;
  types?: string;
  bases?: string[];
  requires?: string[];
  dependencies?: string[];
  devDependencies?: string[];
  scripts?: ILibrariesParams;
}
