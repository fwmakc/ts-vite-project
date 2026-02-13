import { runtimes } from '../consts/runtimes.const';
import type { IRuntime } from '../interfaces/runtime.interface';
import { select } from '../prompts/select.prompt';

export async function runtimeSelect(): Promise<IRuntime> {
  const selected = await select('Select runtime', Object.keys(runtimes));

  return runtimes[selected]!;
}
