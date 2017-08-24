import path from 'path';

export default {

  entry: './src/client/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist/public')
  },

  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },

  resolve: {
    extensions: [' ', '.js', '.jsx']
  }
};