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
    mode: 'development',
    entry: './src/js/index.js',

    output: {
        filename: 'bundle.js',
        path: public_path
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({template: 'public/index.html'}),
        new MiniCssExtractPlugin({filename: 'style.css'})
    ],

    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
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
        open: false,
        inline: false,
        hot: false
    },
};
