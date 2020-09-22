import * as path from 'path';
import { format as formatUrl } from 'url';

import { BrowserWindow, app } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';

const isDevelopment = process.env.NODE_ENV !== 'production';

const isFirstInstance = app.requestSingleInstanceLock();

if (!isFirstInstance) {
  app.quit();
} else {
  // Disable CORS check: https://github.com/electron/electron/issues/23664#issuecomment-631674094
  app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let mainWindow: BrowserWindow | null;

  const createWindow = (): void => {
    // Create the browser window.
    const osPlatform = process.platform;
    log.info('Platform:', osPlatform);
    log.info('isDevelopment:', isDevelopment);
    mainWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        defaultEncoding: 'UTF-8',
        enableRemoteModule: true,
        // Disable CORS check: https://github.com/electron/electron/issues/23664#issuecomment-631674094
        webSecurity: false,
      },
    });

    if (isDevelopment) {
      mainWindow.webContents.openDevTools({
        mode: 'undocked',
      });
    }

    if (isDevelopment) {
      mainWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
    } else {
      mainWindow.loadURL(
        formatUrl({
          pathname: path.join(__dirname, 'index.html'),
          protocol: 'file',
          slashes: true,
        }),
      );
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
    });
  };

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    log.info('App ready');
    createWindow();

    if (!isDevelopment) {
      autoUpdater.checkForUpdatesAndNotify();
    }
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the dock startButton is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow();
    }
  });

  /**
   * If the user is trying to open another instance, we should focus the main window instead.
   * See {@link https://www.electronjs.org/docs/api/app#apprequestsingleinstancelock}
   */
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    }
  });

  if (module.hot) {
    module.hot.accept();
  }
}
