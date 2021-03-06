const { app, BrowserWindow } = require('electron')


function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  })
  win.loadFile('index.html')  
  win.removeMenu()
  win.webContents.openDevTools()
}

app.on('ready', function(){
    createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})



app.on('web-contents-created', (webContentsCreatedEvent, webContents) => {
  webContents.on('before-input-event', (beforeInputEvent, input) => {
    // console.log('Main console::', input)
    const { code, alt, control, shift, meta } = input
    // Shortcut: toggle devTools
    if (shift) {
      BrowserWindow.webContents.executeJavaScript(openFile(dispFile))
    }
    // Shortcut: window reload
    if (shift && control && !alt && !meta && code === 'KeyR') {
      BrowserWindow.getFocusedWindow().reload()
    }
  })
})
