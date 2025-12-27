import { CapacitorFile } from '../../../libs/fs';
import { fileHandle } from '../consts/file_handle.const';

export async function readFileByCapacitorTarget(
  container: HTMLDivElement,
  input: HTMLInputElement,
  button: HTMLButtonElement,
): Promise<void> {
  button.addEventListener('click', async function () {
    container.textContent = 'Идет загрузка...';

    const fileName = input.value;

    try {
      const file = new CapacitorFile(fileName);

      const content = await file.read();
      const handle = file.get();

      container.textContent = content || '';
      fileHandle.value = handle!;
    } catch (e) {
      container.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
}
