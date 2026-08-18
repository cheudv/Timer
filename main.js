const { app, BrowserWindow, dialog, ipcMain, shell } = require('electron');
const path = require('path');
const { startServer, resolveDataDir } = require('./server.js');

app.setPath('userData', resolveDataDir());

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  let win = null;
  let backend = null;

  function stopBackend() {
    if (backend && backend.server) {
      try { backend.server.close(); } catch (e) { /* noop */ }
    }
    backend = null;
  }

  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.show();
      win.focus();
    }
  });

  ipcMain.on('dialog:confirm', (event, message) => {
    const sender = BrowserWindow.fromWebContents(event.sender);
    const result = dialog.showMessageBoxSync(sender, {
      type: 'question',
      message: String(message),
      buttons: ['取消', '确定'],
      defaultId: 1,
      cancelId: 0,
      noLink: true,
    });
    if (sender && !sender.isDestroyed()) {
      sender.blur();
      sender.focus();
    }
    event.returnValue = result === 1;
  });

  ipcMain.on('shell:openExternal', (event, url) => {
    const target = String(url);
    if (/^https?:\/\//i.test(target)) shell.openExternal(target);
  });

  app.whenReady().then(() => {
    backend = startServer({
      port: 0,
      openBrowser: false,
      dataDir: app.getPath('userData'),
    });

    const iconPath = path.join(__dirname, 'build', 'icon.png');

    win = new BrowserWindow({
      width: 1280,
      height: 820,
      minWidth: 960,
      minHeight: 640,
      title: '时录 · 计时统计',
      backgroundColor: '#151039',
      show: false,
      autoHideMenuBar: true,
      icon: iconPath,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        preload: path.join(__dirname, 'preload.js'),
      },
    });

    win.setMenuBarVisibility(false);

    win.once('ready-to-show', () => {
      win.show();
    });

    backend.server.once('listening', () => {
      win.loadURL(backend.url);
    });

    win.on('closed', () => {
      win = null;
      stopBackend();
      app.quit();
    });
  });

  app.on('window-all-closed', () => {
    app.quit();
  });

  app.on('before-quit', () => {
    stopBackend();
  });
}
