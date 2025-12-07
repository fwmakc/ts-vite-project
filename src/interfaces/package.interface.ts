import type { IPackageAuthor } from './package_author.interface';
import type { IPackageBugs } from './package_bugs.interface';
import type { IPackageRepository } from './package_repository.interface';

export interface IPackage {
  name: string;
  version: string;
  productName: string;
  description: string;
  license: string;
  author: IPackageAuthor | string;
  repository: IPackageRepository | string;
  bugs?: IPackageBugs | string;
  homepage: string;
}
