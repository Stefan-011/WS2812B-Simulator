const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, contextBridge, ipcMain } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    minHeight: 400,
    minWidth: 400,
    transparent: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: false, // Disable remote module
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "mainWindow.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.on("close", () => app.quit);
});

const mainMenuTemplate = [];

// FOR MAC MENU
if (process.platform == "darwin") {
  mainMenuTemplate.unshift({});
}

//FOR DEVELOPMENT
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        role: "reload",
      },
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  });
}

ipcMain.on("closeApp-directive", (event) => {
  app.quit();
});

ipcMain.on("minimizeApp-directive", (event) => {
  mainWindow.minimize();
});

ipcMain.on("maximizeApp-directive", (event) => {
  if (!mainWindow.isMaximized()) {
    mainWindow.maximize();
  } else {
    mainWindow.restore();
  }
});
