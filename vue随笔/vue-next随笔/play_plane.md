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

    自定义渲染函数大概就是上面的过程，接下来也就是如何去定义组件了，我们来看一下根组件的文件。

```javascript
// App.js
import { computed, defineComponent, h, ref } from "@vue/runtime-core";
import StartPage from "./src/page/StartPage";
import GamePage from "./src/page/GamePage";
import EndPage from "./src/page/EndPage";

// 举个例子 ,怎么抽离出其他逻辑，可能不太严谨
function createCurrentPage() {
  // ref 接受一个参数值并返回一个响应式且可改变的 ref 对象
  const currentPageName = ref("StartPage");

  // 假设想要将props中的属性创建一个ref对象，可以使用 toRef;
  // const resRef = toRef(props,"x");

  // 计算属性computed，会根据数据的变化，实时响应
  const currentPage = computed(() => {
    if (currentPageName.value === "StartPage") {
      return StartPage;
    } else if (currentPageName.value === "GamePage") {
      return GamePage;
    } else {
      return EndPage;
    }
  });

  return {
    currentPageName,
    currentPage,
  };
}

// defineComponent 用来自定义组件的，options可以点进源码中查看
export default defineComponent({
  /**
   * @description 初始化函数，vue3取消了created 和 beforeCreate 的生命钩子，所有到初始化都放在setup中
   * 所有过程都可以在setup中实现，也可以拆分出去单独实现逻辑，放入setup中。
   * @param {同Vue2,用于父子组件之间的传值} props
   * @param {组件的上下文，vue3中取消了this,所有相关的信息需要在setup中return出去，然后可以在ctx中拿到} ctx
   * 不要解构props对象,如setup({x},ctx)，这会使props失去响应性
   * 另外提示一点，props中的值是readonly属性的,也就是只读属性，不可更改
   * ctx包含attrs/slots/emit等
   */
  setup(props, ctx) {
    const { currentPageName, currentPage } = createCurrentPage();

    // 此处就是你要放置到上下文中的信息，并且这些信息可以在render函数的ctx中使用
    return {
      currentPageName,
      currentPage,
    };
  },
  /**
   *@description 渲染函数就不多介绍了，可以看一下Vue2
   */
  render(ctx) {
    return h("Container", [
      h(ctx.currentPage, {
        onChangePage(page) {
          ctx.currentPageName = page;
        },
      }),
    ]);
  },
});
```

以上代码主要解释了一下[ref,computed,toRef,defineComponent]()的用法，我觉得注释也够详细了，就不多说了，当然用到的其实还少，后续碰到再补充吧。

下面在放一小段代码，讲述一下[reactive,toRefs]的用法吧。

```javascript
// Gamepage.js
function useCreatePlaneInfo() {
  // reactive 接收一个普通对象然后返回该普通对象的响应式代理 基于Proxy实现的
  // 具体细节可以参考官方文档，后续我也会在javascript随笔中记录
  const planeInfo = reactive({ x: 200, y: 500, width: 258, height: 364 });
  const speed = 10;
  addEventListener("keydown", (e) => {
    switch (e.code) {
      case "ArrowUp":
        planeInfo.y -= speed;
        break;
      case "ArrowDown":
        planeInfo.y += speed;
        break;
      case "ArrowLeft":
        planeInfo.x -= speed;
        break;
      case "ArrowRight":
        planeInfo.x += speed;
        break;
      default:
        break;
    }
  });

  return {
    planeInfo,
  };
}

// Bullets
export default defineComponent({
  props: ["x", "y"],
  setup(props, ctx) {
    // 此处是toRefs的用法 可以将props的属性都转换成ref对象，使其具有响应性
    const { x, y } = toRefs(props);
    return { x, y };
  },
  render(ctx) {
    return h("Container", [
      h("Sprite", { texture: bulletImg, x: ctx.x, y: ctx.y }),
    ]);
  },
});
```

最后就在聊一下生命周期吧，可以看一下 Vue2 和 Vue3 生命周期的对比：

```javascript
// vue2
beforeCreate;
created;
beforeMount;
mounted;
beforeUpdate;
updated;
beforeDestroy;
destroyed;
errorCaptured;

// vue3
setup(); // 初始化
onBeforeMount; // 挂载前,此时el和数据可以访问，但是dom不可访问
onMounted; // 挂载完成，此时可以访问dom
onBeforeUpdate; // 数据变化还未触发视图更新前
onUpdated; // 视图已更新
onBeforeUnmount; // 组件实例销毁前，可以用于取消监听，关闭定时器，以及dom事件销毁(避免内存泄漏)等
onUnmounted; // 组件已销毁
onErrorCaptured; // 错误处理机制，没怎么用过，哈哈

// 这两个钩子主要用于调试
onRenderTracked;
onRenderTriggered;
```

目前其实也就用到以上这些，有兴趣可以看一下 examples 下面的 play_plane 项目。

### 小结

其实总结不是很好，后续有时间我在修改，另外有一些新特性也没有放进来讲，比如说[依赖注入，模版 Refs,watchEffect,高级响应式系统 Api]()，这些都可以去官方文档中查阅。
