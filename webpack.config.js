// 单个入口文件
// const path=require("path");
// module.exports={
//     // 入口文件
//     entry:'./src/index.js',
// // 打包目录
//     output:{
//     path:path.resolve(__dirname,'dist'),
//     // 打包的文件名
//     filename:"main.js",
// },
//     mode:"development",
// }

// 多入口文件
const path=require("path");
const loader = require("sass-loader");
// 生产模式打包，会把css分离为独立的css文件，不会写入到js中
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
// 判断是否是开发模式
const devMode=process.env.NODE_ENV!='production';
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
module.exports={
    entry:{
        index:'./src/index.js',
        one:'./src/one.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:"js/[name]-[hash].main.js"
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:devMode?'css/[name].css':'css/[name]-[hash].css',
            chunkFilename:devMode?'[id].css':'[id]-[hash].css'
        }),
        new HtmlWebpackPlugin({
            filename:"index.html",
            chunks:["index"],
            template:'./public/index.html',
            title:'dx'
        }),
        new CleanWebpackPlugin()
    ],
    // 配置各种静态资源
    module:{
        rules:[
            // 正则表达式，匹配js文件
            // 一个{}就是一个loader，现在是bable loader
            {
                test:/\.js$/,
                exclude:/(node_modules|bower_components)/,
                use:{
                    loader:'babel-loader',
                    // options:{
                    //     presets:['@babel/preset-env','@babel/preset-react']
                    // }
                }
            },
            // css loader
            {
                test:/\.css$/,
                use:[devMode?'style-loader':MiniCssExtractPlugin.loader,'css-loader']
            },
            // less loader
            {
                test:/\.less$/,
                use:[{loader:devMode?'style-loader':MiniCssExtractPlugin.loader},{loader:'css-loader'},{loader:'less-loader'}]
            },
            // sass loader
            {
                test:/\.scss$/,
                use:[{loader:devMode?'style-loader':MiniCssExtractPlugin.loader},{loader:'css-loader'},{loader:'sass-loader'}]
            },
            //图片loader
            {
                test:/\.(jpe?g|png|gif)$/,
                use:[
                    // {loader:'file-loader',
                    // options:{
                    //     name:'[name].[ext]',
                    //     publicPath:'./../img',
                    //     outputPath:'img/'
                    // }},
                    // {
                    //     loader:'image-webpack-loader'
                    // }
                    {loader:'url-loader',
                    options:{
                        limit:8192,
                        publicPath:'./../img',
                        outputPath:'img/'
                    }}
                ]
            },
            {
                test:/\.(ttf|eot|woff|woff2)$/,
                loader:'file-loader',
                options:{
                    name:'[name].[ext]',
                    publicPath:'./../font',
                    outputPath:'font/'
                }
            }
        ]
    },
    mode:"development",
    devtool:false,
    devServer:{
        // contentBase:path.join(__dirname,'dist'),//指定webpack-dev-server服务器网站根目录
        // conpress:true,
        port:8080,
        open:true,
        // proxy:{
        //     "/data":{
        //         "target":"http://www.bjlink32.com/data.php",//接口地址，跨域访问
        //         "changeOrigin":true,//开启跨域
        //         pathRewrite:{"^/data":""}
        //     }
        // }
    }
}