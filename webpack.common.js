const { resolve } = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

const buildPath = resolve(__dirname, 'build')
const srcPath = resolve(__dirname, 'src')

module.exports = {
  /**
   * entry:入口文件
   */
  entry: './src/index.js',

  /**
   * output:出口文件
   * 
   * 避免强缓存，给打包文件加哈希值
   * hash:  问题：js 和 css 文件使用同一个hash值，重新打包会导致所有缓存失效
   * chunkhash: 问题：js 和 css 文件 hash 值还是一样，原因是 css 是在 js 中被引入的，同属于一个 chunk
   * contenthash: 解决：根据文件内容生成 hash 值，不同文件内容，hash 一定不一样
   * 
   * chunkFilename: 问题：js中记录hash值，重写编译之后可能找不到之前的文件，解决：runtimeChunk
   */
  output: {
    filename: process.env.production === 'production' ? 'index.[contenthash:10].js' : 'index.[hash:10].js',
    path: buildPath,
    chunkFilename: '[name].[contenthash:10]_chunk.js'
  },

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              // 开启多进程打包
              // 进程启动大概600ms，进程通信也有开销
              // 只有工作消耗时间比较长，才需要
              // 'thread-loader',
              {
                loader: 'thread-loader',
                options: {
                  workers: 2 // 进程2个
                }
              },
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns: 'usage', // 按需加载
                        corejs: { version: 3 }, // 指定core-js版本
                        targets: {
                          chrome: '70',
                          firefox: '66',
                          ie: '11',
                          safari: '10',
                          edge: '17'
                        }
                      }
                    ],
                    '@babel/preset-react'
                  ],
                  /**
                   * 开启babel缓存
                   * 第二次构建，会读取之前的缓存
                   */
                  // cacheDirectory: true
                }
              }
            ]
          },
          {
            // 问题：默认处理不了 html 中 img 图片（使用 html-loader 解决）
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader',
            options: {
              // 图片大小小于8kb就会被base64处理
              // 优点：减少请求数量
              // 缺点：图片体积会更大（文件请求速度更慢）
              limit: 8 * 1024,
              // 问题：url-loader 默认使用 ES6 模块化解析
              // 			html-loader 默认使用 commonjs 解析，解析会报错
              // 解决：关闭 ES6 模块化处理
              esModule: false,
              // 给图片重命名，取hash前10位，取图片原扩展名
              name: '[hash:10].[ext]',
              // 输出路径
              publicPath: '../images',
              outputPath: 'images'
            }
          },
          {
            // 专门处理 html 中 img 文件图片
            // 负责引入 img 图片，能被 url-loader 处理
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            // 打包其他资源
            exclude: /\.(html|js|css|less|jpg|png|gif)$/,
            loader: 'file-loader',
            options: {
              name: '[hash:10].[ext]',
              publicPath: buildPath + '/otherFile',
              outputPath: 'otherFile'
            }
          }
        ]
      },

    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: buildPath + '/public/index.html',
      /**
       * html 代码压缩
       * @collapseWhitespace: 去除多余空格
       * @removeComments: 去除注释
       * @removeAttributeQuotes: 取出后多余引号
       */
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        // removeAttributeQuotes: true,
      }
    }),
    // 告诉webpack哪些库不参与打包，同时使用时的名称也得变
    // new webpack.DllReferencePlugin({
    //   manifest: resolve(__dirname, 'dll/manifest.json')
    // }),
    // 将某个文件打包输出去，并在 html 中自动引入该资源
    // new AddAssetHtmlWebpackPlugin({
    //   filepath: resolve(__dirname, 'dll/jquery.js'),
    //   publicPath: './'
    // }),
  ],

  optimization: {
    runtimeChunk: {
      // 将当前模块的记录其他模块的hash单独打包为一个文件
      name: extrypoint => `runtime-${extrypoint.name}`
    },
  },

  // 解析模块规则
  resolve: {
    // 配置省略文件路径的后缀名
    extensions: ['.js', '.jsx', '.json', '.less'],
    // 配置解析模块路径别名
    alias: {
      '@utils': resolve(srcPath, 'utils/'),
      '@pages': resolve(srcPath, 'pages/'),
      '@images': resolve(srcPath, 'images/'),
    },
    // 告诉webpack 解析模块应该去哪个目录
    modules: [resolve(__dirname, 'node_modules'), 'node_modules']
  }

}