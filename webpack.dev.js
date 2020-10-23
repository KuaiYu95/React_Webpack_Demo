const { resolve } = require('path')
const webpack = require('webpack');
const { merge } = require('webpack-merge');           // 导入 merge 方法
const commonConfig = require('./webpack.common')    // 导入公共config
const themes = require('./themes')  

process.env.NODE_ENV = 'development'

const buildPath = resolve(__dirname, 'build')
const devServer = {
  /**
   * webpack-dev-server 只会在内存中打包，不会有任何输出
   * stats: 精确控制显示哪些捆绑软件信息
   * compress: 开启 gzip 压缩
   * watchContentBase: 监视 contentBase 目录下所有文件，一旦变化就会 reload
   * watchOptions: 监视配置 忽略文件
   * host: 域名
   * port: 端口
   * open: 自动打开默认浏览器
   * hot: 开启 HMR 功能
   * quiet: 除一些基本启动信息以外，其他内容都不用显示
   * clientLogLevel: 
   * overlay: 出现错误不要全屏提示
   * proxy: 代理，解决开发环境跨域问题
   */
  stats: 'errors-only',
  contentBase: buildPath,
  watchContentBase: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  historyApiFallback: true,
  compress: true,
  host: 'localhost',
  port: 8080,
  open: 'Google Chrome',
  hot: true,
  clientLogLevel: 'silent',
  overlay: false,
  proxy: {
    // 一旦devServer(8080)服务器接收到一个/api/xxx请求，就会把请求转发到另一个服务器
    '/api': {
      target: 'http://localhost:3000',
      // 请求路径改写：/api/xxx ---> /xxx
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}
const commonCssLoader = [
  'style-loader',
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

const devConfig = {

  /**
   * 开发环境
   */
  mode: 'development',

  /**
   * source-map
   */
  devtool: 'eval-source-map',

  /**
   * 构建本地服务
   */
  devServer,

  /**
   * models
   */
  module: {
    rules: [
      {
        // package.json 中 eslintConfig 中的设置
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // 优先执行 eslint ，然后执行 babel
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          // 自动修复 eslint 错误
          fix: true,
        }
      },
      {
        test: /\.less$/,
        use: [	// use 执行顺序 从下往上
          ...commonCssLoader,
          // 将 less 文件变成 css 文件
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: themes,
                javascriptEnabled: true
              }
            }
          }
        ],
      },
    ]
  },

  /**
   * 插件
   */
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin()
  ],

}

module.exports = merge(commonConfig, devConfig)