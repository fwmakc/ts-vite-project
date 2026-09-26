import { confirm } from '../prompts/confirm.prompt';

export async function gitSelect(url: string): Promise<boolean> {
  const response = await confirm(`Set up git and sync with ${url}?`, true);

  return Boolean(response);
}
