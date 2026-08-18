const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('shiluConfirm', function (message) {
  return ipcRenderer.sendSync('dialog:confirm', String(message));
});

contextBridge.exposeInMainWorld('shiluOpenUrl', function (url) {
  ipcRenderer.send('shell:openExternal', String(url));
});