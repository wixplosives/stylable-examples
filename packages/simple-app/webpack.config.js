const { join } = require("path");
const { StylableWebpackPlugin } = require("@stylable/webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: join(__dirname, "src", "client-bootstrap"),
  output: {
    path: join(__dirname, "umd"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "@ts-tools/webpack-loader"
      },
      {
        test: filePath =>
          !/\.st\.css$/.test(filePath) && /\.css$/.test(filePath),
        use: ["css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js", ".json"]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new StylableWebpackPlugin({ resolveNamespace: noCollisionNamespace() })
  ]
};

function noCollisionNamespace({
  prefix = "",
  used: usedNamespaces = new Map()
} = {}) {
  return (namespace, stylesheetPath) => {
    const ns = prefix + namespace;
    const used = usedNamespaces.get(ns);
    if (used) {
      if (used.stylesheetPath !== stylesheetPath) {
        throw new Error(
          `namespace (${ns} of ${stylesheetPath}) is already in use by ${used.stylesheetPath}`
        );
      }
    } else {
      usedNamespaces.set(ns, { prefix, namespace, stylesheetPath });
    }
    return ns;
  };
}
