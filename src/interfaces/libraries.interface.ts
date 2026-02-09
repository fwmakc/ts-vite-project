import type { ILibrariesParams } from './libraries_params.interface';

export interface ILibraries {
  libraries?: string[];
  template?: string;
  main?: string;
  dependencies?: ILibrariesParams;
  devDependencies?: ILibrariesParams;
  scripts?: ILibrariesParams;
}
