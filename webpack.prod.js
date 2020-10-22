const { resolve } = require('path')
const webpack = require('webpack');
const { merge } = require('webpack-merge');           // 导入 merge 方法
const commonConfig = require('./webpack.common')    // 导入公共config
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

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
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 告诉webpack哪些库不参与打包，同时使用时的名称也得变
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json')
    }),
    // 将某个文件打包输出去，并在 html 中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/react.js'),
      publicPath: '../',
    }),
  ],

  /**
   * source-map
   */
  devtool: 'hidden-source-map',

  // 可以将 node_modules 中代码单独打包成一个chunk最终输出
  // 自动分析多入口 chunk 中，有无公共的文件，如果有，打包成一个单独的chunk
  optimization: {
    splitChunks: {
      chunks: 'all'
      /**
       * 以下配置都是默认值
       * minSize: 30 * 1024, // 分割的 chunk 最小 30kb
       *  maxSize: 0,
       *  minChunks: 1, // 要提取的 chunk 最少被引用一次
       *  maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
       *  maxInitialRequests: 3, // 入口js文件最大并行运行数量
       *  automaticNameDelimiter: '~~', // 名称连字符
       *  name: true, // 可以使用命名规则
       *  cacheGroups: {  // 分割chunk的组
       *    // node_modules文件会被打包到 vendors 组的chunk中  --> vendors~~xxx.js
       *    vendors: {
       *      test: /[\\/node_modules[\\/]/,
       *      // 打包优先级
       *      priority: -10
       *    },
       *    default: {
       *      minChunks: 2,
       *      priority: -20, 
       *      // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用
       *      reuseExistingChunk: true
       *    }
       * }
        */
    },
    minimizer: [
      // 配置生产环境的压缩方案 js css
      // new TerserWebpackPlugin({
      //   // 开启缓存
      //   cache: true,
      //   // 开启多进程打包
      //   parallel: true,
      // }),
      new UglifyJsWebpackPlugin({
        sourceMap: true,
        parallel: true,  // 启用多线程并行运行提高编译速度
      }),
      // 压缩 css
      new OptimizeCssAssetsWebpackPlugin()
    ]
  }
}

module.exports = merge(commonConfig, prodConfig)