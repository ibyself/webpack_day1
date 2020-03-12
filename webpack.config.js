//引入path模块，专门用于解决路径问题
const path=require('path');
module.exports={
    //入口（从哪里进入开始解析）
    entry:'./src/js/index.js',

    //出口（最终加工完的代码输出到哪里）
    output: {// 输出配置
        path: path.resolve(__dirname, 'build'),//输出文件路径配置
        filename: 'index.js',// 输出文件名
    },
    //所有的loader都要配置在这里,所有的loader在使用的时候都不用引入
    module: {
      //loader "干活"顺序，以及处理哪些文件，都需要在rules指明
      rules: [
        //如下规则是：
        {
          test: /\.less$/,
          use: [{
              loader: "style-loader" // 创建一个style标签，将js中的css放入其中
          }, {
              loader: "css-loader" // 将css以CommonJS语法打包到js中
          }, {
              loader: "less-loader" //将Less转换成css
          }]
        },
        //使用file-loader处理图片资源
        /*{
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader', //如果不做图片转base64，可以用file-loader
              options: {
                outputPath:'img', //图片最终输出的位置,以输出文件为基准（build）
                publicPath:'../build/img',//css资源图片路径,以src文件夹为基准
              name:'[hash:5].[ext]'//修改图片名称
              }
            }
          ]
        },*/
        //使用url-loader处理图片资源
        {
          test: /\.(png|jpg|gif)$/,
          use:[
            {
              loader:'url-loader',//如果不做图片转base64,可以用file-loading
              options:{
                limit:8192,//图片大小的敏感点，大于8kb不转换，小于8kb转成base64
                outputPath:'img',//图片最终输出的位置
                publicPath:'../build/img',//修改图片名称
                name:'[hash:5].[ext]'
              }
            }
          ]
        }
      ]
  }
}