export async function writeFileByTauriTarget(
  container: HTMLTextAreaElement,
  button: HTMLButtonElement,
  status: HTMLDivElement,
): Promise<void> {
  console.log({
    container,
    button,
    status,
  });

  /*
  button.addEventListener('click', async function () {
    status.textContent = 'Идет сохранение...';

    const fileName = fileCurrent.value;
    const content = container.value || '';

    const fileWriter = new WriteFileByTauri();

    try {
      const response = await writeFile(fileWriter, {
        content,
        fileName,
        fileTypes,
      });

      fileCurrent.value = response.fileName;
      status.textContent = `Сохраненный файл: ${fileCurrent.value || ''}`;
    } catch (e) {
      status.textContent = `Error: ${(e as Error)?.message || 'unknown'}`;
    }
  });
  */
}
