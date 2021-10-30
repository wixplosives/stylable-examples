// @ts-check

const path = require('path');
const baseWebpackConfig = require('../../webpack.config');

/** @type import('webpack').Configuration */
module.exports = {
    ...baseWebpackConfig,
    entry: {
        main: require.resolve('./dist/client-bootstrap.js'),
    },
    output: {
        path: path.join(__dirname, 'dist-app'),
    },
};
