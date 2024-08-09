import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { MonkeyRadioAPIHandler } from './monkeyRadioAPI'
import { fileURLToPath } from 'url'
import { useApiStore } from './stores/apiStore'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 900,
    show: false,
    autoHideMenuBar: true,
    darkTheme: true,
    frame: true,
    maximizable: false,
    resizable: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: fileURLToPath(new URL('../preload/index.mjs', import.meta.url)),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('fr.monkeyradio.streamer')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  const apiStore = useApiStore()
  apiStore.bind(ipcMain)

  const monkeyRadioAPIHandler = new MonkeyRadioAPIHandler(apiStore.serverUrl)
  monkeyRadioAPIHandler.bind(ipcMain)

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
