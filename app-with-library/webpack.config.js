// @ts-check

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { StylableWebpackPlugin } = require('@stylable/webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

/** @type import('webpack').Configuration */
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    context: __dirname,
    entry: {
        main: require.resolve('./src/index.tsx'),
    },
    output: {
        path: path.join(__dirname, 'dist-app'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        extensionAlias: {
            '.js': ['.js', '.ts'],
            '.cjs': ['.cjs', '.cts'],
            '.mjs': ['.mjs', '.mts'],
        },
        alias: {
            ...Object.fromEntries(
                Object.entries(require('./package.json').dependencies).map(([name]) => {
                    return [name, require('path').dirname(require.resolve(name + '/package.json'))];
                })
            ),
        },
    },
    stats: {
        // Display bailout reasons
        optimizationBailout: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'swc-loader',
                    options: {
                        jsc: {
                            transform: {
                                react: {
                                    runtime: 'automatic',
                                },
                            },
                            parser: {
                                syntax: 'typescript',
                            },
                        },
                    },
                },
            },
        ],
    },
    plugins: [
        new BundleAnalyzerPlugin({}),
        new HtmlWebpackPlugin(),
        new StylableWebpackPlugin({
            depthStrategy: 'css',
            stcConfig: require.resolve('./stylable.config.js'),
        }),
    ],
};
