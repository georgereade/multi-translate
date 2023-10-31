/** @type {import('@remix-run/dev').AppConfig} */
export const ignoredRouteFiles = ["**/.*"];
export const serverModuleFormat = "cjs";

export const browserNodeBuiltinsPolyfill = {
  modules: {
    buffer: true,
    fs: true,
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
