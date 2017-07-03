import path from 'path';

export default {
  entry: './src/client/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist/public')
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};