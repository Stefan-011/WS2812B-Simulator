const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  closeApp: () => ipcRenderer.send("closeApp-directive"),
  minimizeApp: () => ipcRenderer.send("minimizeApp-directive"),
  maximizeApp: () => ipcRenderer.send("maximizeApp-directive"),
});
