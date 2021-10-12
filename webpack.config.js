const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    port: 3000
  },
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.ts$/, exclude: /node_modules/, loader: 'ts-loader' },
      { test: /\.scss$/, use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'sass-loader'] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
    ]
  },
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'static/index.html') }),
    new CopyPlugin({ patterns: [{ from: 'src/assets', to: 'assets' }] }),
    new MiniCssExtractPlugin({ filename: 'style-[hash].css' }),
  ]
};
