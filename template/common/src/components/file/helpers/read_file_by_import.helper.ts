import { readFile, ReadFileByImport } from '../../../libs/file-interface';

export async function readFileByImport(
  container: HTMLDivElement,
): Promise<void> {
  const fileName = '/src/assets/files/example.txt';
  const fileReader = new ReadFileByImport();

  try {
    const response = await readFile(fileReader, { fileName });
    container.textContent = response.content || '';
  } catch (e) {
    container.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
  }
}
