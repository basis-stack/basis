import path from 'path';

export default {

  entry: './src/client/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist/public')
  },

  module: {
    rules: [

      /* js & jsx */
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      /* css */
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },

  resolve: {
    extensions: [' ', '.js', '.jsx', '.css']
  }
};