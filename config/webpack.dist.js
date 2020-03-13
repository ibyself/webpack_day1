//引入path模块，专门用于解决路径问题
const path = require('path');
//引入extract-text-webpack-plugin插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//引入插件clean-webpack-plugin
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
//引入webpack.common
const common = require('./webpack.common');
//引入合并的库
const merge = require('webpack-merge');
//引入webpack
const webpack = require('webpack');
//引入less-plugin-clean-css，用于压缩css
const CleanCSSPlugin = require("less-plugin-clean-css");
//引入html-webpack-plugin自动生成html，自动引入外部资源
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(common,{
   //输出（最终加工完的代码输出到哪里）
   output: {
    path: path.resolve(__dirname, '../dist'),//输出文件路径配置
    filename: 'js/[name].[hash:10].js'// 输出文件名
  },
  //所有的loader都要配置在这里,所有的loader在使用的时候都不用引入
  module: {
    //loader "干活"顺序，以及处理哪些文件，都需要在rules指明
    rules: [
      //如下规则是：
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","postcss-loader", {loader: "less-loader", options: {
            plugins: [
                new CleanCSSPlugin({ advanced: true })
            ]
        }
}]
        })
      },
      
    ]
  },
  plugins: [
    //提取css为单独文件
    new ExtractTextPlugin("./css/[name].[hash:10].css"),
    //清空输出的文件夹
    new CleanWebpackPlugin(),
    //压缩js
    new webpack.optimize.UglifyJsPlugin({sourceMap:true}),
    //压缩html
    new HtmlWebpackPlugin({
      title:"0318",//生成的html文件的title标签
      filename:"index.html",//生成文件的名字
      template:"./src/index.html",//这里的路径以配置文件所在文件夹的路径为基准
      minify:{ removeComments:true, collapseWhitespace:true}
    }),
  ],
  devtool:'source-map'
})