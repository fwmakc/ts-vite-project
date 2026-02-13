import type { ILibrariesParams } from './libraries_params.interface';

export interface IRuntime {
  run: string;
  install: string;
  add: string;
  addDev: string;
  scripts: ILibrariesParams;
  devDependencies: string[];
  types: string[];
}
