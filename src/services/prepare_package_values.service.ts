import { defaults } from '../consts/defaults.const';
import type { IPackage } from '../interfaces/package.interface';
import { confirm } from '../prompts/confirm.prompt';
import { question } from '../prompts/question.prompt';

export async function preparePackageValues(args: string[]): Promise<IPackage> {
  let {
    name,
    version,
    productName,
    description,
    license,
    author,
    repository,
    bugs,
    homepage,
  } = defaults;

  if (args.length) {
    productName = args
      .map(i => `${i.slice(0, 1).toUpperCase()}${i.slice(1)}`)
      .join(' ');

    name = args.map(i => i.toLowerCase()).join('-');
  } else {
    productName = (await question('Product name', productName)).trim();

    name = productName
      .split(' ')
      .map(i => i.toLowerCase())
      .join('-');

    name = (await question('Project name', name)).trim();
  }

  const extended = await confirm('Config extended project params?');

  if (extended) {
    const userInputVersion = (await question('Version', version)).trim();
    const versionParts = userInputVersion.split('.');

    for (let i = versionParts.length; i < 3; i++) {
      versionParts.push('0');
    }

    version = versionParts.join('.');

    description =
      (await question('Description', description)).trim() || description;

    license = (await question('License', license)).trim() || license;

    author = {};

    author.name = (await question('Author')).trim();
    author.email = (await question('Email')).trim();

    repository = {};

    const defaultInputUrl = `https://github.com/${author.name}/${name}.git`;
    const url =
      (await question('Repository url', defaultInputUrl)).trim() ||
      defaultInputUrl;

    if (url) {
      repository.url = `git+${url}`;

      bugs = {};
      if (author.email) {
        bugs.email = author.email;
      }
      bugs.url = `${url}/issues`;

      homepage = `${url}#readme`;
    }
  }

  const packageValues: IPackage = {
    name,
    version,
    productName,
    description,
    license,
    author,
    repository,
    bugs,
    homepage,
  };

  return packageValues;
}
