import { WebApiFile, WebApiPaths } from '../../../libs/fs';
import { fileHandle } from '../consts/file_handle.const';

export async function writeFileByWebApi(
  container: HTMLTextAreaElement,
  button: HTMLButtonElement,
  status: HTMLDivElement,
): Promise<void> {
  button.addEventListener('click', async function () {
    status.textContent = 'Идет сохранение...';

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

      if (!fileHandle.value) {
        const handle = await file.saveDialog(fileTypes);
        fileHandle.value = handle!;
      }

      file.set(fileHandle.value as FileSystemFileHandle);

      const content = container.value || '';
      await file.write(content);

      status.textContent = `Сохраненный файл: ${(fileHandle.value as FileSystemFileHandle)?.name || ''}`;
    } catch (e) {
      status.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
}
