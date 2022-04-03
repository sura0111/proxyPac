/** @type import('@vue/cli-service').ProjectOptions */
module.exports = {
  pages: {
    popup: {
      template: 'public/browser-extension.html',
      entry: './src/popup/main.ts',
      title: 'Popup',
    },
  },
  configureWebpack: {
    devtool: 'cheap-module-source-map',
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: 'src/background.ts',
        },
      },
    },
  },
  transpileDependencies: ['vuetify'],
}
