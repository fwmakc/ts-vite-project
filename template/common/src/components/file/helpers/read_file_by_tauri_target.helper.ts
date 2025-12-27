import { TauriFile } from '../../../libs/fs';
import { fileHandle } from '../consts/file_handle.const';

export async function readFileByTauriTarget(
  container: HTMLDivElement,
  input: HTMLInputElement,
  button: HTMLButtonElement,
): Promise<void> {
  button.addEventListener('click', async function () {
    container.textContent = 'Идет загрузка...';

    const fileName = input.value;

    try {
      const file = new TauriFile(fileName);

      const content = await file.read();
      const handle = file.get();

      container.textContent = content || '';
      fileHandle.value = handle!;
    } catch (e) {
      container.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
}
