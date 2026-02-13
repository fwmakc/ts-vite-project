import { execSync } from 'child_process';

import { error } from '../helpers/error.helper';
import { print } from '../helpers/print.helper';
import { ILibraries } from '../interfaces/libraries.interface';
import { IRuntime } from '../interfaces/runtime.interface';

export async function installDependencies(targetFolder: string, runtime: IRuntime, libraries: ILibraries): Promise<void> {
  try {
    process.chdir(targetFolder);
    
    const { install, add, addDev } = runtime;

    print(['📦 Installing dependencies...']);

    execSync(`${install}`, { stdio: 'inherit' });

    const { dependencies, devDependencies } = libraries;

    if (devDependencies?.length) {
      console.log(`${addDev} ${devDependencies?.join(' ')}`);
      execSync(`${addDev} ${devDependencies?.join(' ')}`, { stdio: 'inherit' });
    }

    if (dependencies?.length) {
      console.log(`${add} ${dependencies?.join(' ')}`);
      execSync(`${add} ${dependencies?.join(' ')}`, { stdio: 'inherit' });
    }  

    print(['✅ Dependencies installed']);
  } catch (err) {
    error('Error executing next steps', err);
  }
}
