import { WebApiFile } from '../../../libs/fs';
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
      const file = new WebApiFile();

      if (fileHandle.value) {
        console.log('-- fileHandle.value', fileHandle.value);
        file.set(fileHandle.value);
      } else {
        const fileName = `new_file_${Date.now()}.txt`;
        await file.saveDialog(fileName, fileTypes);
        const handle = file.get();
        fileHandle.value = handle!;
      }

      const content = container.value || '';
      await file.write(content);

      status.textContent = `Сохраненный файл: ${fileHandle.value?.name || ''}`;
    } catch (e) {
      status.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
}
