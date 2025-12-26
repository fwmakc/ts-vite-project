import { WebApiFile } from '../../../libs/fs';
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
      const file = new WebApiFile();

      await file.openDialog(undefined, fileTypes);
      const content = await file.read();
      const handle = file.get();

      container.textContent = content || '';
      fileHandle.value = handle!;

      status.textContent = `Открытый файл: ${fileHandle.value?.name || ''}`;
    } catch (e) {
      container.textContent = '';
      status.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
}
