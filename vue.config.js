const path = require("path");
const logo = "./src/assets/logo";
const parts = "./src/components";
module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@logo": path.resolve(__dirname, logo),
        "@parts": path.resolve(__dirname, parts)
      },
      extensions: ['.js', '.vue', '.json']
    }
  },
};