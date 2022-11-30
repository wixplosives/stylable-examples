// @ts-check

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { StylableWebpackPlugin } from '@stylable/webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

class ReExt {
    constructor(matchPackageRegExp, matchExtRegExp, newExt) {
        this.matchPackageRegExp = matchPackageRegExp;
        this.matchExtRegExp = matchExtRegExp;
        this.newExt = Array.isArray(newExt) ? newExt : [newExt];
    }
    apply(resolver) {
        const target = resolver.ensureHook('normal-resolve');
        resolver.getHook('raw-resolve').tapAsync('ReExt', (request, resolveContext, callback) => {
            const requestPath = request.request;
            const matchExtRegExp = this.matchExtRegExp;
            if (
                !(request?.descriptionFileData?.name ?? '').match(this.matchPackageRegExp) ||
                !requestPath ||
                !requestPath.match(matchExtRegExp)
            ) {
                return callback();
            }

            async function runMatchExt(newExt) {
                for (const ext of newExt) {
                    const resolved = await resolveExt(ext);
                    if (resolved) return resolved;
                }
            }

            runMatchExt(this.newExt)
                .then((res) => {
                    res ? callback(null, res) : callback();
                })
                .catch((err) => {
                    callback(err);
                });

            function resolveExt(newExt) {
                return new Promise((res, rej) => {
                    resolver.doResolve(
                        target,
                        {
                            ...request,

                            request: requestPath.replace(matchExtRegExp, newExt),
                            fullySpecified: true,
                        },
                        `replacing extension for ${requestPath} to ${newExt}`,
                        resolveContext,
                        (err, resolved) => {
                            err ? res(undefined) : res(resolved);
                        }
                    );
                });
            }
        });
    }
}

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
        plugins: [new ReExt(/^.*$/, /\.st\.css\.js$/, '.st.css')],
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
