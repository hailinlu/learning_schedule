## npm 私有仓库

### 操作流程

[搭建企业级npm](https://juejin.cn/post/6844904196651630599#heading-8)

```shell
    ## 补充点
    ## 修改config/index.js时需要注意registryHost
    ## 7001端口对应的地址    
    registryHost:"www.lhlchina.com/registry" 
```

### 自定义组件实例

[参考项目](https://github.com/zuley/vue-color-picker)

```shell
    ## 注意事项
    ## 切换到私有仓库的源
    cnpm config set registry https://www.lhlchina.com/registry; 
    cnpm install @zdpower/zdpower-ui;
```



