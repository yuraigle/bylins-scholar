const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    "babel-polyfill",
    "./src/main/webapp/src"
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
        loader: 'file-loader',
        options: {
          digest: 'hex',
          hash: 'sha512',
          name: 'content/[hash].[ext]'
        }
      },
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx', '.css']
  },

  output: {
    path: path.join(__dirname, 'target', 'classes', 'META-INF', 'resources'),
    publicPath: '/'
  },

  devServer: {
    historyApiFallback: true,
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: './src/main/webapp/public/', to: 'static' },
    ]),
    new HtmlWebpackPlugin({
      template: './src/main/webapp/src/index.html',
      chunksSortMode: 'dependency',
      inject: 'body'
    }),
  ],

};
