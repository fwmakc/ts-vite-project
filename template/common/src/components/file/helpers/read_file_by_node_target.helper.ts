import { readFile, ReadFileByNode } from '../../../libs/file-interface';

export async function readFileByNodeTarget(
  container: HTMLDivElement,
  input: HTMLInputElement,
  button: HTMLButtonElement,
): Promise<void> {
  button.addEventListener('click', async function () {
    const fileName = input.value;
    const fileReader = new ReadFileByNode();

    try {
      const response = await readFile(fileReader, { fileName });
      container.textContent = response.content || '';
    } catch (e) {
      container.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
}
