import * as path from 'path';

import { app, BrowserWindow } from 'electron';

// Обработка Squirrel-событий для установщика Windows
const squirrelStartup = await import('electron-squirrel-startup');
if (squirrelStartup.default) {
  app.quit();
}

async function handleSquirrelEvent(): Promise<boolean> {
  if (process.argv.length === 1) {
    return false;
  }

  const { spawn } = await import('child_process');
  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const spawnCommand = function (command: string, args: string[]) {
    try {
      return spawn(command, args, { detached: true });
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const spawnUpdate = function (args: string[]) {
    return spawnCommand(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Создаем ярлыки
      spawnUpdate(['--createShortcut', exeName]);
      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Удаляем ярлыки
      spawnUpdate(['--removeShortcut', exeName]);
      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      app.quit();
      return true;
  }

  return false;
}

// Если обработали Squirrel-событие, выходим
handleSquirrelEvent()
  .then(shouldExit => {
    if (shouldExit) {
      process.exit(0);
    }
  })
  .catch(() => {
    // Игнорируем ошибки и продолжаем запуск приложения
  });

function createWindow(): void {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  win.loadFile('dist/index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
