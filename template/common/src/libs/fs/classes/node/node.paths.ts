import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import type { DefaultPaths } from '../../interfaces/default_paths.interface';

export class NodePaths implements DefaultPaths {
  app?: unknown;
  cache?: unknown;
  data?: unknown;
  documents?: unknown;
  home?: unknown;

  constructor() {
    const app = process.cwd();
    const home = String(os.homedir());

    let programName;

    try {
      const data = fs.readFileSync(path.join(app, 'package.json'), 'utf8');
      const packageInfo = JSON.parse(data);
      const productName = packageInfo.productName;
      const name = packageInfo.name;
      programName = productName || name;
    } catch (e) {
      console.log(e);
      programName = app.split(/\\|\//iu).at(-1);
    }

    this.app = app;
    this.cache = path.join(home, programName, 'cache');
    this.data = path.join(home, programName, 'data');
    this.documents = path.join(home, 'Documents');
    this.home = home;
  }
}
