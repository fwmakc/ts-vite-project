// import { readFile as read } from 'fs-extra';

export async function readFile(fileName: string): Promise<string> {
  try {
    // const { readFile: read } = await import('fs-extra');
    const { readFile: read } = await import('fs/promises');
    return (await read(fileName, 'utf-8')) || '';
  } catch (e) {
    console.log(e);
    return '';
  }
}
