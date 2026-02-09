import type { ILibraries } from '../interfaces/libraries.interface';
import type { ILibrariesParams } from '../interfaces/libraries_params.interface';
import { multiselect } from '../prompts/multiselect.prompt';
import { packages } from '../consts/packages.const';

export async function librariesPackage(): Promise<ILibraries> {
  const options = Object.keys(packages);

  const libraries = await multiselect(
    'Select extended project libraries',
    options,
    true,
  );

  let main: string = '';
  let dependencies: ILibrariesParams = {};
  let devDependencies: ILibrariesParams = {};
  let scripts: ILibrariesParams = {};

  for (const library of libraries) {
    if (packages[library]?.main) {
      main = packages[library]!.main;
    }

    if (packages[library]?.dependencies) {
      dependencies = { ...dependencies, ...packages[library]!.dependencies };
    }

    if (packages[library]?.devDependencies) {
      devDependencies = { ...devDependencies, ...packages[library]!.devDependencies };
    }

    if (packages[library]?.scripts) {
      scripts = { ...scripts, ...packages[library]!.scripts };
    }
  }

  return {
    libraries,
    main,
    dependencies,
    devDependencies,
    scripts,
  };
}
