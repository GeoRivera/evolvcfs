var path = require('path');
var webpack = require('webpack');
module.exports = {
    mode: 'production',
    entry: './src/evolvcfs.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'evolvcfs.min.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    plugins: ['transform-es3-member-expression-literals', 'transform-es3-property-literals']

                }
            }
        }]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};