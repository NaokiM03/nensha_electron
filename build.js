const { build } = require("electron-builder");

build({
  config: {
    productName: "nensha",
    files: ["build/**/*"],
    win: {
      target: "portable",
    },
    portable: {
      artifactName: "nensha.exe",
    },
    copyright: "Copyright © 2021 NaokiM03",
  },
});
