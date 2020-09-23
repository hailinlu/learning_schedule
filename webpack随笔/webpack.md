## webpack 学习笔记

    webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。
    习惯了使用vue-cli脚手架，也接触过webpack的一些配置，也会一些vue.config.js的配置，但是更多的源自于网上的一些通用配置，以及一些项目中特殊处理，但对于webpack确并没有一个深刻到认识，太浮于表面了，从没想过细细的了解每一个配置的含义和用法，也正好在手写飞机大战，看了开课吧老师的熟练运用，心生羡慕，所以迫不及待的就要好好总结一下，当然，东西太多，会一点一点积累。不积跬步无以至千里嘛！！

[webpack 中文网](https://www.webpackjs.com/concepts/)

### entry(入口)

    官方:入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。

```javascript
// 通过对象语法可以配置多页面应用程序
const config = {
  entry: {
    main: "./src/main.js", // 入口文件
    index: "./src/index.js",
  },
};

// 单入口可简写
const config = {
  entry: "./src/main.js",
};
```

### output(输出)

    官方：output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。

```javascript
const path = require("path");
// 常用配置
const config = {
  output: {
    #if SINGLE // c++ 语法
        filename: "bundle.js", // 打包后的文件名
    #else
        filename:"[name].js",
    #endif
    path: path.resolve(__dirname, "./dist"), // 打包路径
  },
};
```

### devtool(调试辅助工具)

    开发环境下打开devtool，可以帮助程序员进行断点调试，快速定位问题。

```javascript
// 生产环境下去除sourcemap
devtool: process.env.NODE_ENV === "production" ? "" : "source-map";
```

### devServer

    为静态文件提供服务
    自动刷新和热替换(HMR)

```javascript
    const path = require("path");
    devServer:{
        contentBase: path.join(__dirname, "dist"), // 告诉服务器从哪里提供内容;
    }
```

### module

    这些选项决定了如何处理项目中的不同类型的模块

#### rules

    创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。

```javascript
module: {
  rules: [
    {
      test: /\.(png|jpe?g|gif)$/i, // 匹配规则
      use: [
        {
          loader: "file-loader", // 使用的加载器
          options: {
            // 加载器的选项
            ouputPath: "assets/",
            publicPath: "",
          },
        },
      ],
    },
  ];
}
```

### 2020/09/23 当天总结

    记录的点基本是当前用到的一些知识点，不会很全，后续会不停的补充进来，下面附上飞机大战的webpack.config.js

```javascript
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./main.js"),
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "./dist"),
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              ouputPath: "assets/",
              publicPath: "",
            },
          },
        ],
      },
    ],
  },
};
```
