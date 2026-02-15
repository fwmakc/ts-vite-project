## [0.8.1-0.8.2] (2026-02-15)

### Bug Fixes

* rename release config to mjs ([28cee6b](https://github.com/fwmakc/ts-vite-project/commit/28cee6bef6fb6409da1731c173c1372c04475d85))
* changelog.md ([b8cec0b](https://github.com/fwmakc/ts-vite-project/commit/b8cec0b9db9b936e82e167641e29263bf1d8df36))
* release config ([2f0990f](https://github.com/fwmakc/ts-vite-project/commit/2f0990fc538880a9677fd2643f9a94c9c19086eb))

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
