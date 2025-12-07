import type { Interface } from 'readline';
import readline from 'readline';

export const rl: Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
