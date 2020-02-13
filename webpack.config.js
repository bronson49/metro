const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const CopyWebpackPlugin= require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MODE = require('yargs').argv.mode;
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function generateHtmlPlugins (templateDir) {
    const templateFilesAll = fs.readdirSync(path.resolve(__dirname, templateDir));
    const templateFiles = templateFilesAll.filter(val => ~val.indexOf('html') );
    return templateFiles.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
        })
    })
}
const htmlPlugins = generateHtmlPlugins('./app');

if (MODE === 'production'){
    htmlPlugins.push(new CleanWebpackPlugin() ) ;
}

module.exports = {
    entry: [
        './app/js/index.js',
        './app/styles/style.scss',
        './app/assets/js/app.js',
    ],
    output: {
        filename: 'js/index.js',
        path: path.resolve (__dirname, 'build') ,
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,

                use: [
                    {loader: MiniCssExtractPlugin.loader,},
                    {loader: "css-loader",
                        options: {
                            url: false
                        }},
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                MODE === 'production' ? require('cssnano') : () => {},
                            ]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
        ],
    },
    plugins: [

        new MiniCssExtractPlugin({
            filename: 'css/main.css',
            chunkFilename: 'main.css',
        }),
        new CopyWebpackPlugin([
            {
            from: './app/fonts',
            to: './fonts'
            },
            {
                from: './app/favicon',
                to: './favicon'
            },
            {
                from: './app/img',
                to: './img'
            },
        ]),
        new VueLoaderPlugin(),
    ].concat(htmlPlugins),

};