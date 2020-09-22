##  Reflect详解

<!-- create at 2020/09/22 -->

    什么是Reflect? Reflect 并不是一个构造函数，因此，并不能通过new方法得到。它的所有的属性和方法都是静态，用法和Math对象相似。
    Reflect是通过introspection来实现的，用于获取底层的原生方法，与Object.keys和Object.getOwnPropertyNames原理相同。
    😄，其实我也不清楚introspection是个啥，Google一下看看 

[Reflect详解在这](https://juejin.im/post/6844903511960846343)

    哎呀，有点照搬照抄的意思了，😄，随笔嘛，遇到哪个看哪个，探究一下用法，直接上函数，原理啥的，我就自己慢慢琢磨吧。


### Reflect.has(target, name)

    判断对象中有没有某个属性。

```javascript
    let myObject = {
        foo:1
    }
    // 老用法
    "foo" in myObject;
    
    // 新用法
    Reflect.has("foo",myObject);
```