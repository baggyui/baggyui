var package = require('../package.json');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}

function getBanner(package) {
  var banner = package.name + ' v' + package.version + '\n';
  banner += '(c) ' + package.year + ' ' + package.author + '\n';
  banner += 'Released under the MIT License.';
  return banner;
}

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'baggyui.min.js',
    publicPath: './',
    library: 'baggyui',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /nodu_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')({
                    browsers: ['last 3 versions']
                  })
                ];
              }
            }
          }, {
            loader: 'sass-loader'
          }]
        })
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        exclude: /nodu_modules/,
        loader: 'url-loader?limit=8192&name=fonts/[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css', '.scss', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  plugins: [
    new ExtractTextPlugin('baggyui.min.css'),
    new webpack.BannerPlugin(getBanner(package)),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
};