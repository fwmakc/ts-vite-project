import { WebApiFile, WebApiPaths } from '../../../libs/fs';
import { fileHandle } from '../consts/file_handle.const';

export async function readFileByWebApi(
  container: HTMLDivElement,
  button: HTMLButtonElement,
  status: HTMLDivElement,
): Promise<void> {
  button.addEventListener('click', async function () {
    container.textContent = 'Идет загрузка...';

    const fileTypes = [
      {
        description: 'Text files',
        mime: 'text/plain',
        extensions: ['txt'],
      },
    ];

    try {
      const paths = new WebApiPaths();
      const defaultDir = await paths.documents();

      const file = new WebApiFile(undefined, defaultDir);

      const handle = await file.openDialog(fileTypes);
      file.set(handle);

      const content = await file.read();

      container.textContent = content || '';
      fileHandle.value = handle!;

      status.textContent = `Открытый файл: ${fileHandle.value?.name || ''}`;
    } catch (e) {
      container.textContent = '';
      status.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
}
