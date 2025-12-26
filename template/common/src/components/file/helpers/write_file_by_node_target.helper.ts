import { writeFile, WriteFileByNode } from '../../../libs/file-interface';

export async function writeFileByNodeTarget(
  container: HTMLTextAreaElement,
  button: HTMLButtonElement,
  status: HTMLDivElement,
): Promise<void> {
  button.addEventListener('click', async function () {
    status.textContent = 'Идет сохранение...';

    const fileName = `new_file_${Date.now()}.txt`;
    const content = container.value || '';

    const fileWriter = new WriteFileByNode();

    try {
      await writeFile(fileWriter, { fileName, content });
      status.textContent = '';
    } catch (e) {
      status.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
}
