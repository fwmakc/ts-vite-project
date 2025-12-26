import { writeFile, WriteFileByTauri } from '../../../libs/file-interface';
import { fileCurrent } from '../consts/file_current.const';
import { fileTypes } from '../consts/file_types.const';

export async function writeFileByTauriTarget(
  container: HTMLTextAreaElement,
  button: HTMLButtonElement,
  status: HTMLDivElement,
): Promise<void> {
  button.addEventListener('click', async function () {
    status.textContent = 'Идет сохранение...';

    const fileName = fileCurrent.value;
    const content = container.value || '';

    const fileWriter = new WriteFileByTauri();

    try {
      const response = await writeFile(fileWriter, {
        content,
        fileName,
        fileTypes,
      });

      fileCurrent.value = response.fileName;
      status.textContent = `Сохраненный файл: ${fileCurrent.value || ''}`;
    } catch (e) {
      status.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
}
