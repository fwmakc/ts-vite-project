import { NodeFile } from '../../../libs/fs';
import { fileHandle } from '../consts/file_handle.const';

export async function writeFileByNodeTarget(
  container: HTMLTextAreaElement,
  button: HTMLButtonElement,
  status: HTMLDivElement,
): Promise<void> {
  button.addEventListener('click', async function () {
    status.textContent = 'Идет сохранение...';

    const fileName =
      (fileHandle.value as string) || `new_file_${Date.now()}.txt`;
    const content = container.value || '';

    try {
      const file = new NodeFile(fileName);

      await file.write(content);

      status.textContent = '';
    } catch (e) {
      status.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
}
