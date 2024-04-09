const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: {
    main: "./src/index.ts",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "sse",
      template: "./src/index.html", // 模板文件路径
      // inject: "body", // 脚本注入的位置
    }),

    new VueLoaderPlugin(),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },

      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        // use: "ts-loader",
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(process.cwd(), "tsconfig.json"),
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".vue"],
    alias: {
      vue$: "vue/dist/vue.runtime.esm-bundler.js",
    },
  },
};
