const { join } = require('path');
const { StylableWebpackPlugin } = require('@stylable/webpack-plugin');
const { noCollisionNamespace } = require('@stylable/core');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: join(__dirname, 'src', 'client-bootstrap'),
    output: {
        path: join(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: '@ts-tools/webpack-loader',
            },
            {
                test: (filePath) => !filePath.endsWith('.st.css') && filePath.endsWith('.css'),
                use: ['css-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg|woff2|ttf)$/i,
                loader: 'url-loader',
                options: {
                    limit: 2048,
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    plugins: [new HtmlWebpackPlugin(), new StylableWebpackPlugin({ resolveNamespace: noCollisionNamespace() })],
};
