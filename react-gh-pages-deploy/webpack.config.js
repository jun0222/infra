const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  devServer: {
    contentBase: "./",
    port: 8080,
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // .ts or .tsx のファイルを対象とする
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    publicPath: "dist/",
  },
};
