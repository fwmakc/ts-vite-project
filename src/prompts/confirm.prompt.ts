import prompts from 'prompts';

export async function confirm(
  message: string,
  initial: boolean = false,
): Promise<string> {
  const response = await prompts({
    type: 'toggle',
    name: 'value',
    message,
    initial,
    active: 'yes',
    inactive: 'no',
  });

  return response.value;
}
