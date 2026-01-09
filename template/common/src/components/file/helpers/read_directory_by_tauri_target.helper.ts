import {
  appCacheDir,
  appConfigDir,
  appDataDir,
  appLocalDataDir,
  cacheDir,
  dataDir,
  documentDir,
  homeDir,
  localDataDir,
  resourceDir,
} from '@tauri-apps/api/path';

export async function readDirectoryByTauriTarget(
  container: HTMLDivElement,
  button: HTMLButtonElement,
): Promise<void> {
  button.addEventListener('click', async function () {
    container.textContent = 'Идет загрузка...';

    try {
      const textContent: string[] = [];

      const cache = await cacheDir();
      textContent.push(`cache:[${cache}]`);

      const data = await dataDir();
      textContent.push(`data:[${data}]`);

      const document = await documentDir();
      textContent.push(`document:[${document}]`);

      const home = await homeDir();
      textContent.push(`home:[${home}]`);

      const localData = await localDataDir();
      textContent.push(`localData:[${localData}]`);

      const resource = await resourceDir();
      textContent.push(`resource:[${resource}]`);

      const appConfig = await appConfigDir();
      textContent.push(`appConfig:[${appConfig}]`);

      const appData = await appDataDir();
      textContent.push(`appData:[${appData}]`);

      const appLocalData = await appLocalDataDir();
      textContent.push(`appLocalData:[${appLocalData}]`);

      const appCache = await appCacheDir();
      textContent.push(`appCache:[${appCache}]`);

      container.textContent = textContent.join('\n');
    } catch (e) {
      container.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
}
