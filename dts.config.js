const alias = require("@rollup/plugin-alias");

// These rollup configurations together support
// `yarn start` and `yarn build` with absolute file paths in dts-cli.

module.exports = {
  rollup(config) {
    // Replace "@/" with "src/" as the root directory.
    config.plugins.push({
      plugins: [
        alias({
          entries: [{ find: /@\//, replacement: /src\// }]
        })
      ]
    });

    // Do not treat absolute paths as external modules.
    return {
      ...config,
      external: (id) => !id.startsWith("@/") && config.external(id)
    };
  }
};
