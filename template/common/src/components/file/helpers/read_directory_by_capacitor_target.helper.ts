import { CapacitorPaths } from '../../../libs/fs';

export async function readDirectoryByCapacitorTarget(
  container: HTMLDivElement,
  button: HTMLButtonElement,
): Promise<void> {
  button.addEventListener('click', async function () {
    container.textContent = 'Идет загрузка...';

    try {
      const textContent: string[] = [];

      const paths = new CapacitorPaths();

      const app = await paths.app();
      textContent.push(`app:[${app}]`);

      const cache = await paths.cache();
      textContent.push(`cache:[${cache}]`);

      const data = await paths.data();
      textContent.push(`data:[${data}]`);

      const documents = await paths.documents();
      textContent.push(`documents:[${documents}]`);

      const home = await paths.home();
      textContent.push(`home:[${home}]`);

      container.textContent = textContent.join('\n');
    } catch (e) {
      container.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
}
