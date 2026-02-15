## [1.0.8](https://github.com/fwmakc/ts-vite-project/compare/v1.0.7...v1.0.8) (2026-02-15)


### Bug Fixes

* use granular npm token ([f7a0a5a](https://github.com/fwmakc/ts-vite-project/commit/f7a0a5af0ed6dbd14c36db7067e2cf9960ddd4e9))

## [1.0.7](https://github.com/fwmakc/ts-vite-project/compare/v1.0.6...v1.0.7) (2026-02-15)


### Bug Fixes

* use granular npm token ([3238418](https://github.com/fwmakc/ts-vite-project/commit/3238418d536f5fe4ee7f05beefcb86ecce54ab4b))

## [1.0.6](https://github.com/fwmakc/ts-vite-project/compare/v1.0.5...v1.0.6) (2026-02-15)


### Bug Fixes

* test release ([7df5832](https://github.com/fwmakc/ts-vite-project/commit/7df5832108b44653c4257059c1c728b10177bde2))

## [1.0.5](https://github.com/fwmakc/ts-vite-project/compare/v1.0.4...v1.0.5) (2026-02-15)


### Bug Fixes

* use granular npm token ([1a34aa5](https://github.com/fwmakc/ts-vite-project/commit/1a34aa581a53b79a1a65b73e3e2f521d864c944e))

## [1.0.4](https://github.com/fwmakc/ts-vite-project/compare/v1.0.3...v1.0.4) (2026-02-15)


### Bug Fixes

* test release without 2fa ([1f78811](https://github.com/fwmakc/ts-vite-project/commit/1f7881102035333e7e4e1c4dbc4a4fb5bc7b6fb2))

## [1.0.3](https://github.com/fwmakc/ts-vite-project/compare/v1.0.2...v1.0.3) (2026-02-15)


### Bug Fixes

* test release without 2fa ([bdcfb2c](https://github.com/fwmakc/ts-vite-project/commit/bdcfb2cc0d67054f1c03a9da8f3fdf33226abd5d))

## [1.0.2](https://github.com/fwmakc/ts-vite-project/compare/v1.0.1...v1.0.2) (2026-02-15)


### Bug Fixes

* test release without 2fa ([972f588](https://github.com/fwmakc/ts-vite-project/commit/972f588fd6f752ef8e14c0ca359fe9607927157f))

## [1.0.1](https://github.com/fwmakc/ts-vite-project/compare/v1.0.0...v1.0.1) (2026-02-15)


### Bug Fixes

* changelog ([ecbcbd3](https://github.com/fwmakc/ts-vite-project/commit/ecbcbd3f2e1c12ad39580c9665a3cd5ca9732219))

# 1.0.0 (2026-02-15)

### Bug Fixes

* changelog.md ([b8cec0b](https://github.com/fwmakc/ts-vite-project/commit/b8cec0b9db9b936e82e167641e29263bf1d8df36))
* release config ([2f0990f](https://github.com/fwmakc/ts-vite-project/commit/2f0990fc538880a9677fd2643f9a94c9c19086eb))
* remove unused steps from workflow ([e379cf5](https://github.com/fwmakc/ts-vite-project/commit/e379cf5fe30d11facdda596722503daedf094b27))
* rename release config to mjs ([28cee6b](https://github.com/fwmakc/ts-vite-project/commit/28cee6bef6fb6409da1731c173c1372c04475d85))
* try another time ([5986109](https://github.com/fwmakc/ts-vite-project/commit/5986109967cc30b02e5a66b38afecfec1f103b9e))
* try another time ([a3ac78c](https://github.com/fwmakc/ts-vite-project/commit/a3ac78c15f8b37d29cd7f513fff8a5a37d08246a))
* try another time ([e8fd16e](https://github.com/fwmakc/ts-vite-project/commit/e8fd16ee03f335e7e02f574a1803019fc58da0c6))
* try another time ([50b4fc8](https://github.com/fwmakc/ts-vite-project/commit/50b4fc8e8842ab504b3fd6117415d85e0340bf6b))
* try new github token ([521f219](https://github.com/fwmakc/ts-vite-project/commit/521f219405ea329b88f540a92916599ce796a8d6))

### Features

* add autocommits ([84a4f3e](https://github.com/fwmakc/ts-vite-project/commit/84a4f3e97f7cac7697677e0ffda63559fdcf4f62))

## [0.8.0] (2026-02-15)

### Added
- Поддержка Biome (форматтер + линтер)
- ESLint 9+ flat config в шаблонах
- Конфигурация AGENTS.md для разработки
- Шаблоны для Electron Builder и Electron Forge
- Поддержка Capacitor (Android, iOS)
- Шаблоны Tauri для desktop
- Библиотека для работы с файловой системой (Electron, Tauri, Capacitor, Web API)

### Changed
- Улучшенная структура шаблонов проектов
- Модульная система добавления библиотек через `packages.const.ts`
- Оптимизированные скрипты сборки для всех runtimes (npm, yarn, deno, bun)
- Обновление шаблонов package.json для всех target
- Разделение vite конфигурации на dev/prod в поддиректории `vite/`
- Улучшенный process.platform detection через `APP` объект

### Bug Fixes
- Корректная обработка зависимостей `package.json` в `update.package.ts`
- Обработка относительных путей для шаблонов
- Пустые объекты dependencies при обновлении

### Removed
- Удалены старые жестко заданные зависимости
- Устаревший format config (CommonJS заменен на ES modules)
