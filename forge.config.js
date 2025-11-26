import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';

const config = {
  packagerConfig: {
    icon: 'electron/app.ico',
    asar: true,
    asarUnpack: [
      '**/*.node',
      'resources/**',
    ],
    extraResource: [
      './electron',
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        // frameworkVersion: 'net461',
        iconUrl: 'file:///',
        setupIcon: 'electron/app.ico',
        loadingGif: 'electron/install-spinner.gif',
        createDesktopShortcut: true,
        createStartMenuShortcut: true,

        perMachine: false,
        noMsi: true,
        anonymizeUser: false,
        remoteReleases: '',
        remoteToken: '',
      },
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        background: 'electron/background.png',
        format: 'ULFO',
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
