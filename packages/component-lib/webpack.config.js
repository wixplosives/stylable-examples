const { join } = require('path');
const { StylableWebpackPlugin } = require('@stylable/webpack-plugin');
const { noCollisionNamespace } = require('@stylable/core');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        main: join(__dirname, 'src', 'demo'),
        // loader: join(__dirname, 'src', 'demo-loader')
    },
    output: {
        path: join(__dirname, 'dist'),
        publicPath: '/',
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
    optimization: {
        splitChunks: {
            minSize: 0,
            // include all types of chunks
            chunks: 'all',
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.mjs', '.js', '.json'],
    },
    plugins: [new HtmlWebpackPlugin(), new StylableWebpackPlugin({ resolveNamespace: noCollisionNamespace() })],
};
