const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: './client/src/index.js',
    
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },

    devtool: 'eval-source-map',

    mode: 'development',

    devServer: {
        host: 'localhost',
        port: 8080,
        static: {
            directory: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
        hot: true,
        historyApiFallback: true,
        headers: { 'Access-Control-Allow-Origin': '*'},
        proxy: {
            '/api/**': {
                target: 'http://localhost:3000/',
                secure: false,
            },
            '/assets/**': {
                target: 'http://localhost:3000/',
                secure: false,
            },
        },
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './client/src/index.html'
        }),
    ],

    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
              },
              {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
              },
        ]
    }
}