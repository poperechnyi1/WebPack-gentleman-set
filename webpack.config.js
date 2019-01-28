const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
// var LiveReloadPlugin = require('webpack-livereload-plugin');
var ReloadPlugin = require('webpack-reload-plugin');


module. exports = {
    target: "web",
    entry: {
        app: './src/index.js',
        ser: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: "/dist"
    },
    module:{
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true,
                        config: {
                            path: 'src/js/postcss.config.js'
                        }}
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true,
                            config: {
                                path: 'src/js/postcss.config.js'
                            }}
                    }
                ]
            }
        ]
    },
    devServer: {
        overlay: true,
        watchContentBase: true,
        publicPath: "/dist",
        contentBase: path.resolve(__dirname, "./"),
        compress: true,
        port: 9001
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new ReloadPlugin("localhost")
        // new LiveReloadPlugin()
        // OccurrenceOrderPlugin is needed for webpack 1.x only
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        // // Use NoErrorsPlugin for webpack 1.x
        // new webpack.NoEmitOnErrorsPlugin()
    ]
}