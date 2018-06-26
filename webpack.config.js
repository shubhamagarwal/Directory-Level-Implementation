var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, './app');
//var DEV_BUILD = path.resolve(__dirname, './public');

var PROD_BUILD = path.resolve(__dirname, './stars-wars')


var env = process.env.NODE_ENV.trim();
function buid_path() {
  if (env == 'production') {
    return PROD_BUILD;
  } else {
    return DEV_BUILD;
  };
};

var config = {
  entry: {
    app: APP_DIR + '/main.js',
    // vendor: [
    //   'moment',
    //   'react-bootstrap-typeahead',
    //   'react-bootstrap',
    //   'react-bootstrap-datetimepicker'
    // ]
  },
  output: {
    path: __dirname,
    filename: 'index.js',
    publicPath: '/'
  },
  devServer: {
      inline: true,
        port: 9995,
        historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['es2015', 'react', "stage-2"]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(svg|jpg|png|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      }
    ]
  }
};

module.exports = config;