const { resolve } = require('path');

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
    },
    target: 'web',
    mode: 'development',
    experiments: {
        topLevelAwait: true
    },
};
