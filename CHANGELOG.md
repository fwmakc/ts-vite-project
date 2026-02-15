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
