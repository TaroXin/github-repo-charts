/* eslint-disable */

const path = require('path')

module.exports = {
  publicPath: '/html',
  pages: {
    index: {
      entry: 'html/src/main.js',
      template: 'html/public/index.html',
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.join(__dirname, 'html/src'))
  }
}
