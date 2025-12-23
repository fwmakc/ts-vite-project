import { readFile, ReadFileByFetch } from '../../../libs/file-interface';

export async function readFileByFetchInProject(
  container: HTMLDivElement,
): Promise<void> {
  // works with dev, electron, from current path and absolute locally folder and correctly not found files

  const fileName = './files/example.txt';
  const fileReader = new ReadFileByFetch();

  try {
    const response = await readFile(fileReader, { fileName });
    container.textContent = response.content || '';
  } catch (e) {
    container.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
  }
}
