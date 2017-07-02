import path from 'path';

export default {
  entry: './src/client/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../build/static/js')
  }
};