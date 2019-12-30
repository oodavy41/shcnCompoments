const path = require('path');
const package = require('./package.json');

const {data} = package;

const publicPathName = 'custom';
const widgetPathName = data.widgetName;


module.exports = {
  entry: './src/production.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `${publicPathName}/${widgetPathName}/[name].js`,
    libraryTarget: "jsonp",
    library: data.widgetName
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.css$/,
        use:[
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }, {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
           {
            loader: 'file-loader',
            options: {
              name: `${publicPathName}/${widgetPathName}/assets/img/[name].[hash:8].[ext]`,
            }
          }
        ]
        
      }
    ]
  }
}