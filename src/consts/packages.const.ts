import type { ILibraries } from '../interfaces/libraries.interface';

export interface IPackagesLibraries {
  [key: string]: ILibraries;
}

export const packages: IPackagesLibraries = {
  biome: {
    template: 'biome',
    scripts: {
      lint: 'biome check --write .',
    },
    devDependencies: ['@biomejs/biome'],
  },

  'eslint + prettier': {
    template: 'eslint_prettier',
    scripts: {
      lint: 'eslint . --fix',
    },
    devDependencies: [
      '@eslint/js',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'eslint',
      'eslint-config-prettier',
      'eslint-plugin-import',
      'eslint-plugin-node',
      'eslint-plugin-prettier',
      'prettier',
    ],
  },

  tailwind: {
    template: 'tailwind',
    devDependencies: ['@tailwindcss/postcss', 'autoprefixer', 'postcss'],
  },

  electron: {
    template: 'electron',
    main: 'electron/main.ts',
    scripts: {
      'electron:compile': 'cross-env VITE_BUILD_TARGET=electron VITE_RUNTIME_PLATFORM=desktop {runtime:run} compile',
      'electron:preview': '{runtime:run} electron:compile && electron .',
    },
    devDependencies: ['@types/electron-squirrel-startup', 'electron'],
    dependencies: ['electron-squirrel-startup'],
  },

  '- builder': {
    template: 'electron-builder',
    scripts: {
      'electron:build': '{runtime:run} electron:compile && electron-builder --config electron-builder.config.js',
    },
    devDependencies: ['electron-builder', 'electron-builder-squirrel-windows'],
  },

  '- forge': {
    template: 'electron-forge',
    scripts: {
      'electron:make': '{runtime:run} electron:compile && electron-forge make',
    },
    devDependencies: [
      '@electron-forge/cli',
      '@electron-forge/maker-deb',
      '@electron-forge/maker-dmg',
      '@electron-forge/maker-rpm',
      '@electron-forge/maker-squirrel',
      '@electron-forge/maker-zip',
      '@electron-forge/plugin-auto-unpack-natives',
      '@electron-forge/plugin-fuses',
      '@electron/fuses',
    ],
  },

  capacitor: {
    template: 'capacitor',
    scripts: {
      'capacitor:android': 'cap add android',
      'capacitor:ios': 'cap add ios',
      'capacitor:make':
        'cap copy && cap sync && cap update && capacitor-assets generate --android --ios --assetPath public --androidProject build/capacitor/android --iosProject build/capacitor/ios/App',
      'capacitor:debug': 'cd build/capacitor/android && gradlew assembleDebug',
      'capacitor:release': 'cd build/capacitor/android && gradlew assembleRelease',
      'capacitor:compile': 'cross-env VITE_BUILD_TARGET=capacitor VITE_RUNTIME_PLATFORM=mobile {runtime:run} compile',
      'capacitor:dev':
        '{runtime:run} capacitor:compile && {runtime:run} capacitor:make && {runtime:run} capacitor:debug',
      'capacitor:build':
        '{runtime:run} capacitor:compile && {runtime:run} capacitor:make && {runtime:run} capacitor:release',
    },
    devDependencies: [
      '@capacitor/android',
      '@capacitor/assets',
      '@capacitor/cli',
      '@capacitor/core',
      '@capacitor/filesystem',
      '@capacitor/ios',
    ],
  },

  tauri: {
    template: 'tauri',
    scripts: {
      'tauri:compile': 'cross-env VITE_BUILD_TARGET=tauri VITE_RUNTIME_PLATFORM=desktop {runtime:run} compile',
      'tauri:init': 'tauri init --force',
      'tauri:dev': 'tauri dev --config tauri.config.json',
      'tauri:build': 'tauri build --config tauri.config.json',
    },
    devDependencies: ['@tauri-apps/cli', '@tauri-apps/plugin-dialog', '@tauri-apps/plugin-fs'],
  },
};
