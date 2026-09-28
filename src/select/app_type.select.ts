import { appTypes } from '../consts/app_types.const';
import { select } from '../prompts/select.prompt';

export async function appTypeSelect(): Promise<string> {
  return select('Select application type', Object.keys(appTypes));
}
