import { execSync } from 'child_process';

import type { ILibraries } from '../interfaces/libraries.interface';
import type { IRuntime } from '../interfaces/runtime.interface';

import { error } from './error.helper';
import { print } from './print.helper';

export async function installDependencies(
  targetFolder: string,
  runtime: IRuntime,
  libraries: ILibraries,
): Promise<void> {
  try {
    process.chdir(targetFolder);

    const { install, add, addDev } = runtime;

    print(['📦 Installing dependencies...']);

    execSync(`${install}`, { stdio: 'inherit' });

    const { dependencies, devDependencies } = libraries;

    if (dependencies?.length) {
      const dependenciesCommand = `${add} ${dependencies?.join(' ')}`;
      print([`📦 ${dependenciesCommand}`]);
      execSync(`${dependenciesCommand}`, { stdio: 'inherit' });
    }

    if (devDependencies?.length) {
      const devDependenciesCommand = `${addDev} ${devDependencies?.join(' ')}`;
      print([`📦 ${devDependenciesCommand}`]);
      execSync(`${devDependenciesCommand}`, { stdio: 'inherit' });
    }

    print(['✅ Dependencies installed']);
  } catch (err) {
    error('Error executing next steps', err);
  }
}
