const { resolve } = require('path')
const webpack = require('webpack');
const { merge } = require('webpack-merge');           // 导入 merge 方法
const commonConfig = require('./webpack.common')    // 导入公共config
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const buildPath = resolve(__dirname, 'build')
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  // 需要在 package.json 中定义 browserslist
  {
    loader: 'postcss-loader',
    ident: 'postcss',
    options: {
      postcssOptions: {
        plugins: [
          ['postcss-preset-env', {}]
        ]
      }
    }
  }
]

const prodConfig = {

  /**
   * 生产环境
   */
  mode: 'production',

  /**
   * models
   */
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [...commonCssLoader, 'less-loader']
      },
    ]
  },

  /**
   * 插件
   */
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      publicPath: buildPath + '/css',
      filename: 'css/index.[chunkhash:10].css'
    })
  ],

  /**
   * source-map
   */
  devtool: 'hidden-source-map',

  optimization: {
    minimizer: [
      // 配置生产环境的压缩方案 js css
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
      })
    ]
  }
}

module.exports = merge(commonConfig, prodConfig)