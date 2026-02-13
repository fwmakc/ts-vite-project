import type { ILibraries } from '../interfaces/libraries.interface';
import type { ILibrariesParams } from '../interfaces/libraries_params.interface';
import { multiselect } from '../prompts/multiselect.prompt';
import { packages } from '../consts/packages.const';
import { IRuntime } from '../interfaces/runtime.interface';

export async function librariesSelect(runtime: IRuntime): Promise<ILibraries> {
  const libraries = await multiselect(
    'Select extended project libraries',
    Object.keys(packages),
    true,
  );

  let main: string = '';
  let dependencies: string[] = [];
  
  let devDependencies: string[] = [
    '@types/jsdom',
    'cross-env',
    'globals',
    'jsdom',
    'terser',
    'typescript',
    'vite',
    'vitest',
    ...runtime.devDependencies,
  ];

  let scripts: ILibrariesParams = {
    ...runtime.scripts,
  };

  for (const library of libraries) {
    if (packages[library]?.main) {
      main = packages[library]!.main;
    }

    if (packages[library]?.dependencies?.length) {
      dependencies = [ ...dependencies, ...packages[library]!.dependencies ];
    }

    if (packages[library]?.devDependencies?.length) {
      devDependencies = [ ...devDependencies, ...packages[library]!.devDependencies ];
    }

    if (packages[library]?.scripts) {
      scripts = { ...scripts, ...packages[library]!.scripts };
    }
  }

  for (const [key, value] of Object.entries(scripts)) {
    scripts[key] = value.replaceAll('{runtime:run}', runtime.run)
  }

  return {
    libraries,
    main,
    dependencies,
    devDependencies,
    scripts,
  };
}
