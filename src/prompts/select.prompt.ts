import prompts from 'prompts';

export async function select(
  message: string,
  options: string[],
): Promise<string> {
  const choices = options.map(i => ({
    title: i,
    value: i.toLowerCase(),
  }));

  const response = await prompts({
    type: 'select',
    name: 'value',
    message,
    choices,
    initial: 0,
  });

  return response.value;
}
