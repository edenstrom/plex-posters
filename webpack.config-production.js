var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './client'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'sass?sourceMap']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      DEV: false
    })
  ]
};
