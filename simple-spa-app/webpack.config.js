// @ts-check

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { StylableWebpackPlugin } = require('@stylable/webpack-plugin');
const path = require('path');

/** @type import('webpack').Configuration */
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    context: __dirname,
    entry: {
        main: require.resolve('./dist/client-bootstrap.js'),
    },
    output: {
        path: path.join(__dirname, 'dist-app'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader',
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset',
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin(), new StylableWebpackPlugin()],
};
