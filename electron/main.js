const {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu,
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

app.whenReady().then(() => {
  createScrapWindow();
  createTray();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("set-opacity", (_, { winId, opacity }) => {
  const win = windows.get(winId);
  win.setOpacity(opacity);
});
