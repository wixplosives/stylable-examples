// @ts-check
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { StylableWebpackPlugin } from '@stylable/webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

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
        alias: {
            /* 
               since we are using a linked library from this monorepo, we want to dedupe it's dependencies.
               this is a workaround to make sure we pick up the current library's node_modules and not the linked one.
            */
            ...useLocalPackages(),
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

function useLocalPackages() {
    const packageJson = readJSON(join(context, 'package.json'));
    const mapping = {};
    Object.keys(packageJson.dependencies).forEach((name) => {
        const packageRoot = join(context, 'node_modules', name);
        const pkg = readJSON(join(packageRoot, 'package.json'));
        if (pkg.type === 'module') {
            Object.keys(pkg.exports).map((k) => {
                if (k === '.') {
                    mapping[name + '$'] = join(packageRoot, pkg.exports[k]);
                } else {
                    mapping[`${name}${k.slice(1)}` + '$'] = join(packageRoot, pkg.exports[k]);
                }
            });
        } else {
            mapping[name] = packageRoot;
        }
    });

    return mapping;
}

function readJSON(filePath) {
    return JSON.parse(readFileSync(filePath, 'utf8'));
}
