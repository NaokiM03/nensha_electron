const {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu,
  globalShortcut,
  clipboard,
} = require("electron");
const path = require("path");

const isDev = process.env.NODE_ENV === "development";

const windows = new Map();

// for GC
let tray = null;

const createScrapWindow = () => {
  const scrapWindow = new BrowserWindow({
    frame: false,
    alwaysOnTop: true,
    useContentSize: true,
    resizable: false,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  if (isDev) {
    scrapWindow.loadURL(
      `http://localhost:8080/scrap.html?win-id=${scrapWindow.id}`
    );
  } else {
    scrapWindow.loadFile(
      path.join(__dirname, `scrap.html?win-id=${scrapWindow.id}`)
    );
  }

  if (isDev) {
    scrapWindow.webContents.openDevTools();
  }

  windows.set(scrapWindow.id, scrapWindow);
};

const createTray = () => {
  tray = new Tray(path.join(__dirname, "app.ico"));
  const contextMenu = Menu.buildFromTemplate([{ label: "Quit", role: "quit" }]);
  tray.setToolTip("nensha");
  tray.setContextMenu(contextMenu);
};

const setShortcut = () => {
  globalShortcut.register("ctrl+2", () => {
    if (clipboard.readImage().isEmpty()) return;
    createScrapWindow();
  });
};

const unsetShortcut = () => {
  globalShortcut.unregisterAll();
};

app.whenReady().then(() => {
  setShortcut();
  createTray();
});

app.on("window-all-closed", () => {});

ipcMain.handle("set-opacity", (_, { winId, opacity }) => {
  const win = windows.get(winId);
  win.setOpacity(opacity);
});

process.on("exit", function () {
  unsetShortcut();
});
