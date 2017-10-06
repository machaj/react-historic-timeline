const path = require('path');

module.exports = {
    devtool: '#inline-source-map',
    entry: {
        demo: './demo/example.js'
    },
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, 'demo')
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};
