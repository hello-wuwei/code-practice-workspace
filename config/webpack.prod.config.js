const merge = require('webpack-merge');
const common = require('./webpack.base.config.js');


const { CleanWebpackPlugin } = require('clean-webpack-plugin');  // 这个插件不被 webpack 官方文档所收录

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const { VueLoaderRule } = require('./util')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      VueLoaderRule,
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here             
              // by default it use publicPath in webpackOptions.output             
              publicPath: '../'    // 处理css背景图片在打包后引入路径问题
            }
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    // style样式是通过style-loader预处理，插入到了head标签内，但是我们平常写样式的时候，一定是通过引入外部css文件进行样式引入的(配合rules中的MiniCssExtractPlugin.loader)，即拆分css文件打包
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
    // require('autoprefixer')
    // require('autoprefixer')({ overrideBrowserslist: ['last 5 version', '>1%', 'ie >=8'] })
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin(), // 我们需要把打包生成的js文件尽可能压缩，以便减少文件体积，更快地被用户加载。
      new OptimizeCssAssetsPlugin({  // 压缩打包出的CSS文件(这段配置也是可以放到 plugins 这个属性下进行配置的)
        assetNameRegExp:/\.css$/g,
        cssProcessor:require("cssnano"),
        cssProcessorPluginOptions:{
          preset:['default', { discardComments: { removeAll:true } }]  // discardComments:去除注释
        },
        canPrint:true  // 插件能够在console中打印信息，默认值是true
      })
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      cacheGroups: {   // cacheGroups对象，定义了需要被抽离的模块，对拆分的文件进行缓存配置,
        aliIcons: {
          test: "aliIcons",  // test属性是比较关键的一个值，他可以是一个字符串，也可以是正则表达式，还可以是函数。如果定义的是字符串，会匹配入口模块名称，会从其他模块中把包含这个模块的抽离出来
          name: "aliIcons",  // name是抽离后生成的名字，和入口文件模块名称相同，这样抽离出来的新生成的aliIcons模块会覆盖被抽离的aliIcons模块，虽然他们都叫aliIcons
          enforce: true
        },
        vendors: {   // 它的test设置为 /node_modules/ 表示只筛选从node_modules文件夹下引入的模块，所以所有第三方模块才会被拆分出来
          priority: -10,
          test: /node_modules/,
          name: "vendor",
          enforce: true,
        },
      }
    }
  }
});