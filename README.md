Шаблон для проектов:

- typescript,
- vite,
- vitest,
- eslint,
- prettier,
- electron.

# Начало работы

Создаем новый каталог для проекта

```
mkdir my_project
cd my_project
```

Клонируем репозиторий

```
git clone https://github.com/fwmakc/ts-vite-project.git .
```

Устанавливаем

```
yarn
```

# Быстрый запуск

В режиме разработки

```
yarn dev
```

# Запуск под десктоп

В режиме разработки

```
yarn electron:dev
```

## Билд под десктопные устройства

Следующие настройки берутся из **package.json**:

- имя пакета,
- название приложения,
- версия,
- автор,
- описание.

За билд отвечает **electron forge**, файл настроек **forge.config.js**.

Общий конфиг для всех устройств задается в секции **packagerConfig**:

- icon, иконка приложения,
- asar, упаковщик ресурсов,
- asarUnpack, внутренние ресурсы, которые будут запакованы,
- extraResource, внешние ресурсы, которые не будут оставлены снаружи приложения.

За билд под **windows** отвечает **maker-squirrel**.

Здесь прописаны иконки:

- iconUrl, намеренно оставлена пустой,
- setupIcon, иконка для установки,
- loadingGif, изображение во время установки.

и другие настройки.

Обратите внимание на каталог **electron**. Он содержит ресурсы для упаковки приложения:

- app.ico, иконка приложения,
- background.png, фон установки приложения,


main.ts
Иконка 

Выполняем предварительную сборку

```
yarn build
```

Собираем приложение под десктоп

```
yarn electron:make
```

Готовое приложение будет лежать в каталоге

```
out/template-vite-ts-win32-x64
```

## Билд под MacOS

* информация не проверена

Добавить в **forge.config.js**:

```
  packagerConfig: {
    name: 'YourApp',
    executableName: 'YourApp',
    appBundleId: 'com.yourcompany.yourapp',
    appCategoryType: 'public.app-category.productivity',
    osxSign: {
      identity: 'Developer ID Application: Your Name (TEAM_ID)',
      'hardened-runtime': true,
      entitlements: 'entitlements.plist',
      'entitlements-inherit': 'entitlements.plist',
      'signature-flags': 'library'
    },
    osxNotarize: {
      tool: 'notarytool',
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_PASSWORD,
      teamId: process.env.APPLE_TEAM_ID
    }
  },
```

Упрощенная конфигурация (без подписи):

```
  packagerConfig: {
    name: 'YourApp',
    osxSign: {},
    osxNotarize: {
      tool: 'notarytool',
    }
  },
```

Сборка приложения:

```
# Только упаковать приложение (без установщиков)
npm run package

# Создать установщики (DMG, ZIP)
npm run make

# Собрать только для macOS
npm run make -- --platform darwin

# Собрать для конкретной архитектуры
npm run make -- --platform darwin --arch x64
npm run make -- --platform darwin --arch arm64
npm run make -- --platform darwin --arch universal
```

Для подписи и нотификации cоздайте файл **entitlements.plist**:

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
    <key>com.apple.security.cs.debugger</key>
    <true/>
    <key>com.apple.security.automation.apple-events</key>
    <true/>
</dict>
</plist>
```

Подписать приложение:

```
npm run build --electron-mac-sign --product-id="your-product-id" --app-id="your-app-id" --name="Your-app-name" --version="version-number" --keystore-path=path/to/keystore-file.p12 --store-password=password
```

## Подготовка к сборке под мобильные устройства

Сборку делаем через capacitor. Полностью все происходит в несколько шагов.

Для настройки отредактируйте файл

```
capacitor.config.ts
```

Добавляем мобильное устройство. Это нужно сделать один раз после развертывания проекта.

```
yarn cap add android
```

Созданный каталог android содержит множество настроек приложения, которые хотелось бы сохранить в репозитории. Но он также содержит много временных файлов и копии проекта и поэтому получается слишком большим.

Мы создали другой каталог app, где вы можете хранить все настройки и ресурсы для сборки.

Перед сборкой вам просто нужно скопировать его содержимое

```
cp -rf app/android/* android/app/src/main
```

или

```
xcopy app\android\* android\app\src\main /E /H /C /I /Y
```

Выполняем предварительную сборку

```
yarn build
```

Копируем собранный проект для следующего этапа

```
yarn cap copy
```

## Билд под мобильные устройства

Для дальнейшей сборки под android лучше всего работать в контейнере nodejs из проекта https://github.com/isengine/server.git

Перейдем в каталог

```
cd android
```

Билд в режиме дебаг:

```
./gradlew assembleDebug
```

Готовое приложение будет лежать в каталоге

```
android/app/build/outputs/apk/debug/app-debug.apk
```

Билд в продакшн:

```
./gradlew assembleRelease
```

Готовое приложение теперь будет лежать в каталоге

```
android/app/build/outputs/apk/release/app-release-unsigned.apk
```

Дальнейшие действия лучше выполнять из корневого каталога проекта

```
cd ..
```

Создаем ключ для подписи

```
keytool -genkey -v -keystore MY_RELEASE_KEY.jks -keyalg RSA -keysize 2048 -validity 10000 -alias MY_KEY_ALIAS

```

Запишите созданные пароли и alias, так как они понадобятся вам в дальнейшем.

Создаем копию приложения

```
cp android/app/build/outputs/apk/release/app-release-unsigned.apk android/app/build/outputs/apk/release/app-release.apk
```

Подписываем приложение

```
apksigner sign --ks MY_RELEASE_KEY.jks --ks-key-alias MY_KEY_ALIAS --ks-pass pass:YOUR_KEYSTORE_PASSWORD --key-pass pass:YOUR_KEY_PASSWORD android/app/build/outputs/apk/release/app-release.apk
```

Можно проверить подпись

```
apksigner verify android/app/build/outputs/apk/release/app-release.apk
```

Если APK подписан правильно, вы не увидите никаких ошибок.

# Тестирование

Тестируем с помощью vitest.

Vitest очень похож на jest, но сразу оптимизирован для использования с typescript и vite. С его помощью можно также тестировать DOM-элементы.

Примеры использования приведены в проекте.

Помещаем файл рядом с объектом тестирования и называем так же, но с расширением **.test.ts**.

Пример:

```
src/counter.ts
src/counter.test.ts
```

Для запуска всех тестов используем команду

```
yarn test
```

Чтобы запустить какой-либо определенный тест, указываем его в качестве аргумента:

```
yarn test ./src/tests/example.test.ts
```

# Лицензия

Лицензия MIT, 2025
