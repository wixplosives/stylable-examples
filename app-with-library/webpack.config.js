// @ts-check
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { StylableWebpackPlugin } from '@stylable/webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const context = dirname(fileURLToPath(import.meta.url));

/** @type import('webpack').Configuration */
const config = {
    mode: 'development',
    devtool: 'source-map',
    context,
    entry: {
        main: './src/index.tsx',
    },
    output: {
        path: join(context, 'dist-app'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        extensionAlias: {
            '.js': ['.js', '.tsx', '.ts'],
            '.cjs': ['.cjs', '.cts'],
            '.mjs': ['.mjs', '.mts'],
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
            stcConfig: join(context, 'stylable.config.cjs'),
        }),
    ],
};

if (process.env.ANALYZE_BUILD !== undefined) {
    config.plugins?.push(new BundleAnalyzerPlugin({}));
    config.stats = {
        optimizationBailout: true,
    };
}

export default config;
