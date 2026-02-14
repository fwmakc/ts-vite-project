import type { IRuntime } from '../interfaces/runtime.interface';

export interface IPackagesRuntimes {
  [key: string]: IRuntime;
}

export const runtimes: IPackagesRuntimes = {
  npm: {
    run: 'npm run',
    install: 'npm install',
    add: 'npm install',
    addDev: 'npm install -D',
    scripts: {
      dev: 'vite',
      build: 'npm run lint && npm run test && npm run compile',
      compile: 'tsc && vite build',
      preview: 'vite preview',
      lint: "echo 'linter skipped'",
      test: 'vitest run --config ./vitest.config.js',
    },
    devDependencies: ['@types/node', 'ts-node'],
    types: ['node'],
  },

  yarn: {
    run: 'yarn',
    install: 'yarn install',
    add: 'yarn add',
    addDev: 'yarn add --dev',
    scripts: {
      dev: 'vite',
      build: 'npm run lint && npm run test && npm run compile',
      compile: 'tsc && vite build',
      preview: 'vite preview',
      lint: "echo 'linter skipped'",
      test: 'vitest run --config ./vitest.config.js',
    },
    devDependencies: ['@types/node', 'ts-node'],
    types: ['node'],
  },

  deno: {
    run: 'deno task',
    install: 'deno install',
    add: 'deno add',
    addDev: 'deno add --dev',
    scripts: {
      dev: 'deno run -A npm:vite',
      build: 'deno task lint && deno task test && deno task compile',
      compile: 'deno check src/**/*.ts && deno run -A npm:vite build',
      preview: 'deno run -A npm:vite preview',
      lint: "echo 'linter skipped'",
      test: 'deno run -A npm:vitest run --config ./vitest.config.js',
    },
    devDependencies: ['@types/node', 'ts-node'],
    types: ['npm:@types/node', 'deno.window', 'deno.ns'],
  },

  bun: {
    run: 'bun',
    install: 'bun install',
    add: 'bun add',
    addDev: 'bun add -d',
    scripts: {
      dev: 'bun x --bun vite',
      build: 'bun run lint && bun run test && bun run compile',
      compile: 'tsc && bun x --bun vite build',
      preview: 'bun x --bun vite preview',
      lint: "echo 'linter skipped'",
      test: 'bun x vitest run --config ./vitest.config.js',
    },
    devDependencies: ['@types/node', '@types/bun', 'ts-node'],
    types: ['node', 'bun'],
  },
};
