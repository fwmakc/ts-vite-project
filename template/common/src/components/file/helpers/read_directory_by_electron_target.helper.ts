// import { app } from 'electron';
// import { app } from '@electron/remote';

export async function readDirectoryByElectronTarget(
  container: HTMLDivElement,
  button: HTMLButtonElement,
): Promise<void> {
  button.addEventListener('click', async function () {
    container.textContent = 'Идет загрузка...';

    console.log('Renderer script loaded');

    console.log((window as any).electronAPI); // Должен быть объект
    console.log(typeof (window as any).electronAPI.getApp); // Должно быть 'function'

    if (!(window as any).electronAPI) {
      console.error('electronAPI is not available');
      return;
    }

    try {
      const textContent: string[] = [];

      const appPath = await (window as any).electronAPI.getPath('appPath');
      textContent.push(`appPath:[${appPath}]`);

      const home = await (window as any).electronAPI.getPath('home');
      textContent.push(`home:[${home}]`);

      const appData = await (window as any).electronAPI.getPath('appData');
      textContent.push(`appData:[${appData}]`);

      const assets = await (window as any).electronAPI.getPath('assets');
      textContent.push(`assets:[${assets}]`);

      const userData = await (window as any).electronAPI.getPath('userData');
      textContent.push(`userData:[${userData}]`);

      const sessionData = await (window as any).electronAPI.getPath(
        'sessionData',
      );
      textContent.push(`sessionData:[${sessionData}]`);

      const temp = await (window as any).electronAPI.getPath('temp');
      textContent.push(`temp:[${temp}]`);

      const exe = await (window as any).electronAPI.getPath('exe');
      textContent.push(`exe:[${exe}]`);

      const module = await (window as any).electronAPI.getPath('module');
      textContent.push(`module:[${module}]`);

      const desktop = await (window as any).electronAPI.getPath('desktop');
      textContent.push(`desktop:[${desktop}]`);

      const documents = await (window as any).electronAPI.getPath('documents');
      textContent.push(`documents:[${documents}]`);

      const downloads = await (window as any).electronAPI.getPath('downloads');
      textContent.push(`downloads:[${downloads}]`);

      const recent = await (window as any).electronAPI.getPath('recent');
      textContent.push(`recent:[${recent}]`);

      const logs = await (window as any).electronAPI.getPath('logs');
      textContent.push(`logs:[${logs}]`);

      container.textContent = textContent.join('\n');
    } catch (e) {
      container.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
}
