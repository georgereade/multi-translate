/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "cjs",
};

browserNodeBuiltinsPolyfill = {
  modules: {
    buffer: true, // Provide a JSPM polyfill
    fs: true, // Provide an empty polyfill
    http: true,
    path: true,
    os: true,
    url: true,
    util: true,
    crypto: true,
  },
  globals: {
    Buffer: true,
  },
};
