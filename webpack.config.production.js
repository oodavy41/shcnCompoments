const path = require("path");
const package = require("./package.json");

const { data } = package;

const widgetPathName = data.widgetName;

module.exports = {
  entry: "./src/production.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `${widgetPathName}/[name].js`,
    libraryTarget: "jsonp",
    library: data.widgetName
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: "file-loader",
            options: {
              name: `${widgetPathName}/assets/img/[name].[hash:8].[ext]`
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ZipPlugin({
      filename: `${widgetPathName}.zip`
    })
  ]
};
