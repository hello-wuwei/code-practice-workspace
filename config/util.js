exports.VueLoaderRule = {
  test: /\.vue$/,
  use: [
    {
      loader: 'vue-loader',
      options: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    }
  ]
}