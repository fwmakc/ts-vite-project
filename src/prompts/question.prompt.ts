import prompts from 'prompts';

export async function question(
  message: string,
  initial: string = '',
): Promise<string> {
  const response = await prompts({
    type: 'text',
    name: 'value',
    message,
    initial,
  });

  return response.value || '';
}
