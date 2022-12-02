const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
});

module.exports = {
  chainWebpack: (config) => {
    config.module.rules.delete("svg");
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: "vue-svg-loader",
        },
      ],
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/style.scss";`,
      },
    },
  },
  devServer: {
    host: "localhost",
  },
};
