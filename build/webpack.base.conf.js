const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');


const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
};

module.exports = {

    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}js/[name].[chunkhash].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendors',
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                  }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: `${PATHS.src}/index.html`,
            filename: "./index.html",
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[contenthash].css`,
        }),
        new CopyWebpackPlugin([
            {from: `${PATHS.src}/${PATHS.assets}/img`, to: `${PATHS.assets}img`},
            {from: `${PATHS.src}/${PATHS.assets}/sounds`, to: `${PATHS.assets}sounds`},
        ])
    ]
};