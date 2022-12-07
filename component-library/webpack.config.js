// @ts-check

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { StylableWebpackPlugin } from '@stylable/webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const context = path.dirname(fileURLToPath(import.meta.url));
/** @type import('webpack').Configuration */
export default {
    mode: 'development',
    devtool: 'source-map',
    context,
    entry: {
        main: path.join(context, './src/demo/demo.tsx'),
    },
    output: {
        path: path.join(context, 'dist-demo'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        extensionAlias: {
            '.js': ['.ts', '.tsx', '.js'],
            '.cjs': ['.cts', '.cjs'],
            '.mjs': ['.mts', '.mjs'],
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
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
        new HtmlWebpackPlugin(),
        new StylableWebpackPlugin({
            depthStrategy: 'css',
            stcConfig: path.join(context, './stylable.config.cjs'),
        }),
    ],
};
