import { readFile, ReadFileByBrowserApi } from '../../../libs/file-interface';
import { fileHandle } from '../consts/file_handle.const';
import { fileTypes } from '../consts/file_types.const';

export async function readFileByBrowserApi(
  container: HTMLDivElement,
  button: HTMLButtonElement,
  status: HTMLDivElement,
): Promise<void> {
  button.addEventListener('click', async function () {
    container.textContent = 'Идет загрузка...';

    const fileReader = new ReadFileByBrowserApi();

    try {
      const response = await readFile(fileReader, {
        fileHandle: undefined,
        fileTypes,
      });

      container.textContent = response.content || '';
      fileHandle.value = response.fileHandle;
      status.textContent = `Открытый файл: ${fileHandle.value?.name || ''}`;
    } catch (e) {
      container.textContent = '';
      status.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
}
