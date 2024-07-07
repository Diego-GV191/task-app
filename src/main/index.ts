import { app, shell, BrowserWindow, ipcMain, dialog, globalShortcut } from 'electron'
import path, { join } from 'path'
import fs from 'fs'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  const iconPath = path.join(__dirname, '../../resources/app_ico.png')

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minWidth: 800,
    minHeight: 400,
    title: 'App de tareas',
    center: true,
    show: false,
    autoHideMenuBar: true,
    icon: iconPath,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.maximize()
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.handle('save-file', async (event, fileContent) => {
    event.preventDefault
    try {
      const { canceled, filePath } = await dialog.showSaveDialog({
        title: 'Guardar Archivo',
        defaultPath: path.join(__dirname),
        buttonLabel: 'Guardar',
        filters: [
          { name: 'JSON files', extensions: ['json'] },
          { name: 'All files', extensions: ['*'] },
        ],
      })

      if (!canceled && filePath) {
        await fs.writeFileSync(filePath, JSON.stringify(fileContent))
        return filePath
      } else {
        return ''
      }
    } catch (error) {
      console.log(error)
      return ''
    }
  })

  ipcMain.handle('open-file', async (event) => {
    event.preventDefault
    const result = await dialog.showOpenDialog({
      title: 'Abrir Archivo',
      properties: ['openFile', 'showHiddenFiles'],
      filters: [
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'All Files', extensions: ['*'] },
      ],
    })

    if (!result.canceled) {
      const filePath = result.filePaths[0]
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      return fileContent
    }
    return null
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  globalShortcut.unregisterAll()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
