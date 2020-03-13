//引入path模块，专门用于解决路径问题
const path = require('path');
//引入extract-text-webpack-plugin插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//引入插件clean-webpack-plugin
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
//引入webpack.common
const common = require('./webpack.common');
//引入合并的库
const merge = require('webpack-merge')
module.exports = merge(common,{
  
  //所有的loader都要配置在这里,所有的loader在使用的时候都不用引入
  module: {
    //loader "干活"顺序，以及处理哪些文件，都需要在rules指明
    rules: [
      //如下规则是：
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader"]
        })
      },
      
    ]
  },
  plugins: [
    //提取css为单独文件
    new ExtractTextPlugin("./css/index.css"),
    
     new CleanWebpackPlugin(),
  ]
})