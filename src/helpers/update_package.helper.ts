import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

import type { ILibraries } from '../interfaces/libraries.interface';
import type { IPackage } from '../interfaces/package.interface';

import { error } from './error.helper';

export function updatePackage(targetDir: string, values: IPackage, libraries: ILibraries): void {
  const packageJsonPath = path.join(targetDir, 'package.json');

  if (!existsSync(packageJsonPath)) {
    error(`File not found: ${packageJsonPath}`, null);
  }

  let packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

  packageJson = {
    ...packageJson,
    ...values,
    main: libraries.main,
    scripts: {
      ...packageJson.scripts,
      ...libraries.scripts,
    },
  };

  try {
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  } catch (err) {
    error('Error write package.json', err);
  }
}
