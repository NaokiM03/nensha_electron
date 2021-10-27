const { app, BrowserWindow } = require("electron");
const path = require("path");

const isDev = process.env.NODE_ENV === "development";

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
    scrapWindow.loadURL("http://localhost:8080/scrap.html");
  } else {
    scrapWindow.loadFile(path.join(__dirname, "scrap.html"));
  }

  if (isDev) {
    scrapWindow.webContents.openDevTools();
  }
};

app.whenReady().then(() => {
  createScrapWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
