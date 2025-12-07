import { defaults } from '../consts/defaults.const';
import { question } from '../helpers/question.helper';
import type { IPackage } from '../interfaces/package.interface';

export async function preparePackageValues(
  projectNameFromArgs: string = '',
): Promise<IPackage> {
  let { name, version, productName, description, repository, author } =
    defaults;

  if (projectNameFromArgs) {
    name = projectNameFromArgs;
  } else {
    name = (await question(`Project name (${name}): `)) || name;

    const userInputVersion =
      (await question(`Version (${version}): `)) || version;
    const versionParts = userInputVersion.split('.');

    for (let i = versionParts.length; i < 3; i++) {
      versionParts.push('0');
    }

    version = versionParts.join('.');

    productName =
      (await question(`Product name (${productName}): `)) || productName;

    description =
      (await question(`Description (${description}): `)) || description;

    repository = (await question('Repository url: ')) || repository;

    const userInputAuthor = ((await question('Author: ')) || '').trim();

    if (userInputAuthor) {
      const userInputEmail = ((await question('Email: ')) || '').trim();

      const authors = [];
      if (userInputAuthor) {
        authors.push(userInputAuthor);
      }
      if (userInputEmail && userInputEmail !== userInputAuthor) {
        authors.push(`<${userInputEmail}>`);
      }

      author = authors.join(' ');
    }
  }

  const packageValues: IPackage = {
    name: name.trim(),
    version: version.trim(),
    productName: productName.trim(),
    description: description.trim(),
    repository: repository.trim(),
    author: author.trim(),
  };

  return packageValues;
}
