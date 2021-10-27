const { contextBridge, clipboard } = require("electron");

contextBridge.exposeInMainWorld("clipboard", {
  getImage: (callback) => {
    const image = clipboard.readImage();
    if (image.isEmpty()) return;

    const data = image.toDataURL();
    const imageSize = image.getSize();
    const width = imageSize.width;
    const height = imageSize.height;
    return callback({
      data,
      width,
      height,
    });
  },
});
