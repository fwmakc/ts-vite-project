import { Directory, Filesystem } from '@capacitor/filesystem';

export async function readDirectoryByCapacitorTarget(
  container: HTMLDivElement,
  button: HTMLButtonElement,
): Promise<void> {
  button.addEventListener('click', async function () {
    container.textContent = 'Идет загрузка...';

    try {
      const textContent: string[] = [];

      const Cache = await Filesystem.getUri({
        directory: Directory.Cache,
        path: 'test.txt',
      });
      textContent.push(`Cache:[${Cache.uri}]`);

      const Data = await Filesystem.getUri({
        directory: Directory.Data,
        path: 'test.txt',
      });
      textContent.push(`Data:[${Data.uri}]`);

      const Documents = await Filesystem.getUri({
        directory: Directory.Documents,
        path: 'test.txt',
      });
      textContent.push(`Documents:[${Documents.uri}]`);

      const Library = await Filesystem.getUri({
        directory: Directory.Library,
        path: 'test.txt',
      });
      textContent.push(`Library:[${Library.uri}]`);

      const LibraryNoCloud = await Filesystem.getUri({
        directory: Directory.LibraryNoCloud,
        path: 'test.txt',
      });
      textContent.push(`LibraryNoCloud:[${LibraryNoCloud.uri}]`);

      const External = await Filesystem.getUri({
        directory: Directory.External,
        path: 'test.txt',
      });
      textContent.push(`External:[${External.uri}]`);

      const ExternalStorage = await Filesystem.getUri({
        directory: Directory.ExternalStorage,
        path: 'test.txt',
      });
      textContent.push(`ExternalStorage:[${ExternalStorage.uri}]`);

      const ExternalCache = await Filesystem.getUri({
        directory: Directory.ExternalCache,
        path: 'test.txt',
      });
      textContent.push(`ExternalCache:[${ExternalCache.uri}]`);

      const Temporary = await Filesystem.getUri({
        directory: Directory.Temporary,
        path: 'test.txt',
      });
      textContent.push(`Temporary:[${Temporary.uri}]`);

      container.textContent = textContent.join('\n');
    } catch (e) {
      container.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
}
