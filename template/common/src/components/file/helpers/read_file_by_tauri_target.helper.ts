import { readFile, ReadFileByTauri } from '../../../libs/file-interface';
import { fileCurrent } from '../consts/file_current.const';
import { fileTypes } from '../consts/file_types.const';

export async function readFileByTauriTarget(
  container: HTMLDivElement,
  input: HTMLInputElement,
  button: HTMLButtonElement,
): Promise<void> {
  button.addEventListener('click', async function () {
    fileCurrent.value = input.value;
    const fileName = fileCurrent.value;
    const fileReader = new ReadFileByTauri();

    try {
      const response = await readFile(fileReader, { fileName, fileTypes });

      container.textContent = response.content || '';

      if (response.fileName) {
        fileCurrent.value = response.fileName;
        input.value = response.fileName;
      }
    } catch (e) {
      container.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
}
