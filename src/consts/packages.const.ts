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
    devDependencies: {
      '@biomejs/biome': '^2.3.14',
    },
  },

  'eslint + prettier': {
    template: 'eslint_prettier',
    scripts: {
      lint: 'eslint . --fix',
    },
    devDependencies: {
      '@eslint/js': '^9.39.1',
      '@typescript-eslint/eslint-plugin': '^8.47.0',
      '@typescript-eslint/parser': '^8.47.0',
      'eslint': '^9.39.1',
      'eslint-config-prettier': '^10.1.8',
      'eslint-plugin-import': '^2.32.0',
      'eslint-plugin-node': '^11.1.0',
      'eslint-plugin-prettier': '^5.5.4',
      'prettier': '^3.6.2',
    },
  },

  tailwind: {
    template: 'tailwind',
    devDependencies: {
      autoprefixer: '^10.4.24',
      postcss: '^8.5.6',
      tailwindcss: '^4.1.18',
    },
  },

  electron: {
    template: 'electron',
    main: 'electron/main.ts',
    scripts: {
      'electron:compile': 'cross-env VITE_BUILD_TARGET=electron VITE_RUNTIME_PLATFORM=desktop npm run compile',
      'electron:preview': 'npm run electron:compile && electron .',
    },
    devDependencies: {
      '@types/electron-squirrel-startup': '^1.0.2',
      'electron': '^39.2.2',
    },
    dependencies: {
      'electron-squirrel-startup': '^1.0.1',
    },
  },

  '- builder': {
    template: 'electron-builder',
    scripts: {
      'electron:build': 'npm run electron:compile && electron-builder --config electron-builder.config.js',
    },
    devDependencies: {
      'electron-builder': '^26.0.12',
      'electron-builder-squirrel-windows': '^26.0.12',
    },
  },

  '- forge': {
    template: 'electron-forge',
    scripts: {
      'electron:make': 'npm run electron:compile && electron-forge make',
    },
    devDependencies: {
      '@electron-forge/cli': '^7.10.2',
      '@electron-forge/maker-deb': '^7.10.2',
      '@electron-forge/maker-dmg': '^7.10.2',
      '@electron-forge/maker-rpm': '^7.10.2',
      '@electron-forge/maker-squirrel': '^7.10.2',
      '@electron-forge/maker-zip': '^7.10.2',
      '@electron-forge/plugin-auto-unpack-natives': '^7.10.2',
      '@electron-forge/plugin-fuses': '^7.10.2',
      '@electron/fuses': '^1.8.0',
    },
  },

  capacitor: {
    template: 'capacitor',
    scripts: {
      'capacitor:android': 'cap add android',
      'capacitor:ios': 'cap add ios',
      'capacitor:make': 'cap copy && cap sync && cap update && capacitor-assets generate --android --ios --assetPath public --androidProject build/capacitor/android --iosProject build/capacitor/ios/App',
      'capacitor:debug': 'cd build/capacitor/android && gradlew assembleDebug',
      'capacitor:release': 'cd build/capacitor/android && gradlew assembleRelease',
      'capacitor:compile': 'cross-env VITE_BUILD_TARGET=capacitor VITE_RUNTIME_PLATFORM=mobile npm run compile',
      'capacitor:dev': 'npm run capacitor:compile && npm run capacitor:make && npm run capacitor:debug',
      'capacitor:build': 'npm run capacitor:compile && npm run capacitor:make && npm run capacitor:release',
    },
    devDependencies: {
      '@capacitor/android': '^7.4.4',
      '@capacitor/assets': '^3.0.5',
      '@capacitor/cli': '^7.4.4',
      '@capacitor/core': '^7.4.4',
      '@capacitor/filesystem': '^8.0.0',
      '@capacitor/ios': '^7.4.4',
    },
  },

  tauri: {
    template: 'tauri',
    scripts: {
      'tauri:compile': 'cross-env VITE_BUILD_TARGET=tauri VITE_RUNTIME_PLATFORM=desktop npm run compile',
      'tauri:init': 'tauri init --force',
      'tauri:dev': 'tauri dev --config tauri.config.json',
      'tauri:build': 'tauri build --config tauri.config.json',
    },
    devDependencies: {
      '@tauri-apps/cli': '^2.9.5',
      '@tauri-apps/plugin-dialog': '~2',
      '@tauri-apps/plugin-fs': '~2',
    },
  },
};
