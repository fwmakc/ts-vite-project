import { Directory, Filesystem } from '@capacitor/filesystem';

export async function readDirectoryContentByCapacitorTarget(
  container: HTMLDivElement,
  input: HTMLInputElement,
  dir: HTMLInputElement,
  button: HTMLButtonElement,
): Promise<void> {
  button.addEventListener('click', async function () {
    container.textContent = 'Идет загрузка...';

    const path = input.value || '';
    const dirName = dir.value || '';

    let directory;

    if (dirName === 'documents') {
      directory = Directory.Documents;
    }
    if (dirName === 'external') {
      directory = Directory.External;
    }
    if (dirName === 'data') {
      directory = Directory.Data;
    }
    if (dirName === 'storage') {
      directory = Directory.ExternalStorage;
    }

    try {
      const contents = await Filesystem.readdir({
        path,
        directory,
      });

      container.textContent = JSON.stringify(contents || 'null') || '';
    } catch (e) {
      container.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
}
