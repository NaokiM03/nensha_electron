/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    electron: { url: "/", static: true },
    public: { url: "/", static: true },
    scrap: { url: "/scrap" },
  },
  plugins: [
    "@snowpack/plugin-svelte",
    "@snowpack/plugin-optimize",
    "@snowpack/plugin-typescript",
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    bundle: true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    open: "none",
  },
  buildOptions: {
    baseUrl: "./",
  },
};
