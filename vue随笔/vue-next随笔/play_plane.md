## 飞机大战码后感

    哈哈，终于自己手撸了一遍飞机大战，虽然之前跟着课程走了一遍，但是还是自己思考着走一遍更顺畅，也能更好的熟悉vue3的最新的api和用法，本来吧，还想自己写一下思维导图的，不过，深度还不够，就先借鉴一下老师的思维导图吧。

[github](https://github.com/cuixiaorui/mini-vue) 这是开课吧老师的 github 地址，也是我下一步需要学习的简化版 vue3 到源码地址。

### 初始化

#### 流程图

![初始化流程图](https://user-gold-cdn.xitu.io/2020/7/6/1732311ea8a9142a?w=1724&h=762&f=png&s=493353)

#### 关键函数调用图

![关键函数调用图1](https://user-gold-cdn.xitu.io/2020/6/22/172dc07fc42b7d2c?w=1342&h=144&f=png&s=54200)

![关键函数调用图2](https://user-gold-cdn.xitu.io/2020/6/22/172dc08840e25b42?w=1816&h=934&f=png&s=550722)

> 可以基于函数名快速搜索到源码内容

### update

#### 流程图

![update流程图](https://user-gold-cdn.xitu.io/2020/6/23/172e19b5cefba34e?w=3200&h=800&f=png&s=540515)

#### 关键函数调用图

![update关键函数调用图](https://user-gold-cdn.xitu.io/2020/6/23/172e19d2d42464aa?w=3300&h=1006&f=png&s=739008)

废话不多说，下面就总结一下手撸飞机大战的一些知识点吧。

```javascript
// runtime-canvas/index.js
import { createRenderer } from "@vue/runtime-core";
import { Container, Sprite, Text, Texture } from "pixi.js";

const renderer = createRenderer({
  /**
   * @description 创建元素
   * @param {元素类型} type
   * @example h("Container")
   */
  createElement(type) {
    let element;
    switch (type) {
      case "Container":
        element = new Container();
        break;
      case "Sprite":
        element = new Sprite();
        break;
      default:
        break;
    }

    return element;
  },
  /**
   * @description 处理props、attrs、events等
   * @param {createElement返回的元素}  el
   * @param {key值}  key
   * @param {未改变的值}  prevValue
   * @param {最新的值}  nextValue
   * @example h("Sprite",{x:100,y:200,onClick:function(){console.log("click")}})
   */
  patchProp(el, key, prevValue, nextValue) {
    switch (key) {
      case "texture":
        el.texture = Texture.from(nextValue);
        break;
      case "onClick":
        el.on("pointertap", nextValue);
        break;
      default:
        el[key] = nextValue;
        break;
    }
  },
  /**
   * @description 处理props、attrs、events等
   * @param {createElement返回的元素}  el
   * @param {父节点}  parent
   */
  insert(el, parent) {
    parent.addChild(el);
  },
  /**
   * @description 创建文本节点，并挂载到所属父节点上
   * @param {挂载节点} node
   * @param {文本字符串} text
   * @example h("Container",[h("Sprite",{x:0,y:0},"test")])
   */
  setElementText(node, text) {
    const cText = new Text(text);
    node.addChild(cText);
  },
  /**
   * @description 创建文本元素
   * @param {文本字符串} text
   * @example h("Container",[h("Sprite",{x:0,y:0}),"test"])
   * 注意test文本的位置
   */
  createText(text) {
    return new Text(text);
  },
  // 注释
  createComment() {},
  //父节点
  parentNode() {},
  // 兄弟节点
  nextSibling() {},
  // 删除节点
  remove(el) {
    const parent = el.parent;
    if (parent) {
      parent.removeChild(el);
    }
  },
});

// 渲染根组件
export function createApp(rootComponent) {
  return renderer.createApp(rootComponent);
}
```

上述这段代码有什么作用呢？先看[createRenderer](),这个函数就是实现了我们的自定义渲染工作，主要是处理[h]()函数，也就是 render 函数中需要创建的[vnode]()的整个流程。
详细到代码注释已经放上去了，还有几个函数未实现，也没有出现在代码中，有兴趣可以去看一下源码。最后是[creatApp](),也就是 Vue2 中我们熟悉的创建根组件的虚拟节点，然后挂载到 app 上,如下：

```javascript
// main.js
import { createApp } from "./src/runtime-canvas";
import App from "./App";
import { getRootContainer } from "./Game";
createApp(App).mount(getRootContainer());
```
