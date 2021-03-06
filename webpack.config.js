"use strict";

const path = require('path');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');

/**
 * @see https://webpack.js.org/plugins/split-chunks-plugin/
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');

/* output */
const public_path = path.resolve(__dirname, 'public');

/**
 * @see https://github.com/jantimon/html-webpack-plugin
 */
module.exports = {
    mode: 'production',
    entry: [
        './src/js/index.js',
        './src/sass/default.sass'
    ],

    output: {
        filename: 'assets/js/[name].[chunkhash].js',
        path: public_path
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({template: 'src/source/index.html'}),
        new MiniCssExtractPlugin({filename: 'assets/css/[name].[chunkhash].css'})
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [path.resolve(__dirname, 'src/js')],
                loader: 'babel-loader',

                options: {
                    plugins: ['syntax-dynamic-import'],

                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                modules: false
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/fonts/[name].[ext]',
                        }
                    }
                ]
            }
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/
                }
            },

            chunks: 'async',
            minChunks: 1,
            minSize: 30000,
            name: true
        },
        minimizer: [
            new TerserPlugin({}),
            new OptimizeCssAssetsPlugin({})
        ]
    },

    devServer: {
        watchContentBase: true,
        contentBase: public_path,
        port: 3000,
        open: true,
        inline: false,
        hot: false
    },
};
