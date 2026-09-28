import { appTypes } from '../consts/app_types.const';
import { packages } from '../consts/packages.const';
import { print } from '../helpers/print.helper';
import type { ILibraries } from '../interfaces/libraries.interface';
import type { ILibrariesParams } from '../interfaces/libraries_params.interface';
import type { IRuntime } from '../interfaces/runtime.interface';
import { multiselect } from '../prompts/multiselect.prompt';

export async function librariesSelect(runtime: IRuntime, appType: string): Promise<ILibraries> {
  const options = Object.keys(packages).filter(key => {
    if (appTypes[key]) {
      return false;
    }

    const bases = packages[key]?.bases;

    return !bases || bases.includes(appType);
  });

  const selected = await multiselect('Select extended project libraries', options);

  const libraries = [appType, ...selected];
  const notices: string[] = [];

  for (let i = 0; i < libraries.length; i++) {
    const library = libraries[i];

    if (!library) {
      continue;
    }

    for (const requirement of packages[library]?.requires ?? []) {
      if (libraries.includes(requirement)) {
        continue;
      }

      libraries.push(requirement);
      notices.push(`ℹ  '${library}' requires '${requirement}' — added automatically`);
    }
  }

  if (notices.length) {
    print(notices);
  }

  let main: string = '';
  let types: string = '';
  let dependencies: string[] = [];

  let devDependencies: string[] = [
    ...(appType === 'ts + vite app'
      ? ['@types/jsdom', 'cross-env', 'globals', 'jsdom', 'terser', 'vite', 'vitest']
      : []),
    'typescript',
    ...runtime.devDependencies,
  ];

  let scripts: ILibrariesParams = {
    ...runtime.scripts,
  };

  for (const library of libraries) {
    if (packages[library]?.main) {
      main = packages[library].main;
    }

    if (packages[library]?.types) {
      types = packages[library].types;
    }

    if (packages[library]?.dependencies?.length) {
      dependencies = [...dependencies, ...packages[library].dependencies];
    }

    if (packages[library]?.devDependencies?.length) {
      devDependencies = [...devDependencies, ...packages[library].devDependencies];
    }

    if (packages[library]?.scripts) {
      scripts = { ...scripts, ...packages[library].scripts };
    }
  }

  for (const [key, value] of Object.entries(scripts)) {
    scripts[key] = value.replaceAll('{runtime:run}', runtime.run);
  }

  return {
    libraries,
    main,
    types,
    dependencies,
    devDependencies,
    scripts,
  };
}
