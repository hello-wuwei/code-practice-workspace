const path = require('path');

const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const prodConfig = require('./webpack.prod.config.js');

// 打包的文件名
const npm_config_name = process.env.npm_config_name

module.exports = merge(prodConfig, {
  entry: {
    index: './src/pages/' + npm_config_name + '/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../build/' + npm_config_name),
    // publicPath: './dist/' + npm_config_name,
    filename: 'js/[name].[chunkhash:8].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',   // 为什么不是 '../public/index.html'，我的理解是无论与要用的template是不是在一个目录，都是从根路径开始查找
      template: 'src/pages/' + npm_config_name + '/index.html',
      inject: true,
      chunks: ['index', 'vendor'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    })
  ]
})