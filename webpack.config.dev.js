const path = require('path');
var webpack = require('webpack');
// const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ASSET_PATH = process.env.ASSET_PATH || '../';
module.exports = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    // entry: ["./src/js/main.js"],
    entry: {
        main: './src/js/main.js'
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "js/[name].[chunkhash].min.js",
    },
    // dev 設定檔省略了優化
    // optimization: {
    //     // 啟用最小化
    //     minimize: true,
    //     // 處理最小化
    //     minimizer: [new TerserWebpackPlugin]
    // },
    module: {
        rules: [
            // 引入Babel
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // 編譯 css 檔案設定
            {
                test: /\.css$/i,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ASSET_PATH, // 修改公共路徑
                        },
                    },
                    // 'css-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            // sourceMap: false
                        }
                    }
                ],
            },
            // 編譯 scss 檔案設定
            // {
            //     test: /\.s[ac]ss$/i,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         'css-loader',
            //         'sass-loader'
            //     ]
            // }
            // 處理 require("font")
            // {
            //     test: /\.(woff|woff2|eot|ttf|otf|)$/,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             name: 'font/[name].[ext]',
            //         },
            //     }, ],
            // },
            // 處理 require("image")
            {
                test: /\.(png|jpe?g|gif)$/i,
                exclude: /node_modules/,
                use: [{
                        // 直接配置 url-loader 就好，超過上限的資源會自動 fallback 給 file-loader
                        loader: 'url-loader',
                        options: {
                            name: 'img/[name].[ext]',
                            limit: 10000,
                        },

                    },
                    "image-webpack-loader"
                ],
            },

        ]
    },
    plugins: [
        // 引入jquery
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        // 變更css生成路徑
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new HtmlWebpackPlugin({
            // title: '按照ejs模板生成出来的页面-測試',
            filename: 'index.html',
            inject: 'body',
            template: './src/index.html',
        })
    ],
    devServer: {
        // port: 9000, // 設定本地伺服器的端口，預設為 8080
        open: true, // 伺服器啟動後是否自動打開瀏覽器，預設為 false
        hot: true, // 開啟 HMR 支持
        watchFiles: path.join(__dirname, 'src'),
    },
}