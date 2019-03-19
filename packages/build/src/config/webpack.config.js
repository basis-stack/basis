import path from 'path';

import { runtimeDir } from '../utilities';

export default {

  entry: './src/client/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(runtimeDir, 'dist/public')
  },

  module: {
    rules: [

      /* js & jsx */
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: [' ', '.js', '.jsx']
  }
};