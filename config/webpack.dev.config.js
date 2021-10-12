const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.base.config.js');
const setupProxy = require('./setupProxy')

const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    // historyApiFallback: true,    // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    // host: process.env.HOST || '0.0.0.0',
    open: true,
    port: 9090,
    compress: true,
    hot: true,
    proxy: setupProxy
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});