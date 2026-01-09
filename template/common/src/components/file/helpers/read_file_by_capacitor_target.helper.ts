import { CapacitorFile } from '../../../libs/fs';
import { fileHandle } from '../consts/file_handle.const';

export async function readFileByCapacitorTarget(
  container: HTMLDivElement,
  input: HTMLInputElement,
  dir: HTMLInputElement,
  button: HTMLButtonElement,
): Promise<void> {
  button.addEventListener('click', async function () {
    container.textContent = 'Идет загрузка...';

    const fileName = input.value;
    const dirName = dir.value;

    try {
      const file = new CapacitorFile(fileName);

      const content = await file.read(dirName || undefined);
      const handle = file.get();

      container.textContent = content || '';
      fileHandle.value = handle!;
    } catch (e) {
      container.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
}
