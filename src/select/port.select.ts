import prompts from 'prompts';

import { onState } from '../prompts/on_state.prompt';

const DEFAULT_PORT = 8080;

export async function portSelect(libraries: string[]): Promise<number> {
  if (!libraries.includes('ts + vite app')) {
    return DEFAULT_PORT;
  }

  const response = await prompts({
    type: 'number',
    name: 'value',
    message: 'Dev server port',
    initial: DEFAULT_PORT,
    min: 1,
    max: 65535,
    onState,
  });

  const port = Number(response.value);

  return Number.isInteger(port) && port >= 1 && port <= 65535 ? port : DEFAULT_PORT;
}
