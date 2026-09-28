## [1.2.1](https://github.com/fwmakc/ts-vite-project/compare/v1.2.0...v1.2.1) (2026-09-28)


### Bug Fixes

* **console:** replace unmaintained ts-node with tsx ([68e1d7e](https://github.com/fwmakc/ts-vite-project/commit/68e1d7e901af319014d563a3bcc46f91e44ca47b))

# [1.2.0](https://github.com/fwmakc/ts-vite-project/compare/v1.1.0...v1.2.0) (2026-09-28)


### Bug Fixes

* guard undefined capture group in git remote branch detection ([69f3207](https://github.com/fwmakc/ts-vite-project/commit/69f3207ceecefe677bfcf6eee3c5a169f96f2d8f))
* **template:** drop electron preload duplicate from renderer libs ([fa688bc](https://github.com/fwmakc/ts-vite-project/commit/fa688bc1b99dc4a2025a23aa439b19fd8b4d2065))


### Features

* **console:** replace jest with vitest in console template ([d7649b4](https://github.com/fwmakc/ts-vite-project/commit/d7649b49b0a1cfc3891eb5441fb8bedfebc3ac93))
* select application type before add-ons and resolve dependencies ([e5394c3](https://github.com/fwmakc/ts-vite-project/commit/e5394c325442a3b15234380397c8c22888b5311b))

# [1.1.0](https://github.com/fwmakc/ts-vite-project/compare/v1.0.10...v1.1.0) (2026-09-26)


### Bug Fixes

* **deps:** bump @semantic-release/npm for npm trusted publishing (oidc) ([537ddf0](https://github.com/fwmakc/ts-vite-project/commit/537ddf0b7f9302968990d03883eb6476b15a24b1))
* **deps:** bump semantic-release to 25 for oidc-capable bundled npm plugin ([8be64db](https://github.com/fwmakc/ts-vite-project/commit/8be64dbef1e465b1a10e7404600b276cdf97dec5))
* remove silent logLevel and fix ignored build config keys in vite template ([c893c31](https://github.com/fwmakc/ts-vite-project/commit/c893c3198516f25fe8aa85779ac8912ae9eab7d9))


### Features

* ask dev server port and ignore engines mismatch on install ([53b4c1a](https://github.com/fwmakc/ts-vite-project/commit/53b4c1aea2ba462f8c080765bb2c1e96209b78ee))
* init git and sync project with remote repository ([e6dbce2](https://github.com/fwmakc/ts-vite-project/commit/e6dbce2e0340886477924a9fecad7c26ee3444ff))

# [1.1.0](https://github.com/fwmakc/ts-vite-project/compare/v1.0.10...v1.1.0) (2026-09-26)


### Bug Fixes

* remove silent logLevel and fix ignored build config keys in vite template ([c893c31](https://github.com/fwmakc/ts-vite-project/commit/c893c3198516f25fe8aa85779ac8912ae9eab7d9))


### Features

* ask dev server port and ignore engines mismatch on install ([53b4c1a](https://github.com/fwmakc/ts-vite-project/commit/53b4c1aea2ba462f8c080765bb2c1e96209b78ee))
* init git and sync project with remote repository ([e6dbce2](https://github.com/fwmakc/ts-vite-project/commit/e6dbce2e0340886477924a9fecad7c26ee3444ff))

## [1.0.10](https://github.com/fwmakc/ts-vite-project/compare/v1.0.9...v1.0.10) (2026-02-17)


### Bug Fixes

* common files to ts vite template and add console project as ts template ([1591bc9](https://github.com/fwmakc/ts-vite-project/commit/1591bc9e41a7f5de40e84f6b3e69def190162e44))

## [1.0.9](https://github.com/fwmakc/ts-vite-project/compare/v1.0.8...v1.0.9) (2026-02-15)


### Bug Fixes

* add auto versioning into github or gitlab ([e7dda0d](https://github.com/fwmakc/ts-vite-project/commit/e7dda0d35c3897a2ec4f5454ddff51963f4bf24c))

## [1.0.1-1.0.8] (2026-02-15)

### Bug Fixes

* test auto release

# 1.0.0 (2026-02-15)

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
