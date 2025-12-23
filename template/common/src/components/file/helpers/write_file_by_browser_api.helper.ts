import { writeFile, WriteFileByBrowserApi } from '../../../libs/file-interface';
import { fileHandle } from '../consts/file_handle.const';
import { fileTypes } from '../consts/file_types.const';

export async function writeFileByBrowserApi(
  container: HTMLTextAreaElement,
  button: HTMLButtonElement,
  status: HTMLDivElement,
): Promise<void> {
  button.addEventListener('click', async function () {
    status.textContent = 'Идет сохранение...';

    const fileName = `new_file_${Date.now()}.txt`;
    const content = container.value || '';

    const fileWriter = new WriteFileByBrowserApi();

    try {
      const response = await writeFile(fileWriter, {
        content,
        fileHandle: fileHandle.value,
        fileName,
        fileTypes,
      });

      fileHandle.value = response.fileHandle;
      status.textContent = `Сохраненный файл: ${fileHandle.value?.name || ''}`;
    } catch (e) {
      status.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
}
