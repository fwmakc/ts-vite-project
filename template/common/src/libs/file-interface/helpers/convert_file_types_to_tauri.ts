import type { FileTypes } from '../interfaces/file_types.interface';

export function convertFileTypesToTauri(
  fileTypes?: FileTypes,
): any[] | undefined {
  if (!fileTypes || !Array.isArray(fileTypes)) {
    return;
  }

  const filters = fileTypes.map(fileType => {
    const extensions: string[] = [];

    Object.values(fileType?.accept || [])?.forEach(items => {
      items.forEach(item => {
        const extension = `${item}`.replace('.', '');
        extensions.push(extension);
      });
    });

    const filter = {
      name: fileType.description,
      extensions,
    };

    return filter;
  });

  return filters;
}
