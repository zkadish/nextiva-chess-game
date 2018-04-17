const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'chess-game.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  devtool: 'cheap-module-source-map'
}