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
        alias: useLocalPackages(),
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
        new HtmlWebpackPlugin(),
        new StylableWebpackPlugin({
            depthStrategy: 'css',
            stcConfig: require.resolve('./stylable.config.js'),
        }),
    ],
};

if (process.env.ANALYZE_BUILD !== undefined) {
    module.exports.plugins?.push(new BundleAnalyzerPlugin({}));
    module.exports.stats = {
        optimizationBailout: true,
    };
}

function useLocalPackages() {
    return Object.fromEntries(
        Object.entries(require('./package.json').dependencies).map(([name]) => {
            return [name, path.join(__dirname, 'node_modules', name)];
        })
    );
}
