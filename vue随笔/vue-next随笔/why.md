## why I must learn vue3?( 为什么必须学习 vue3?)

    从官方的文档中提到了vue3的动机和目的:

    (1)更好的逻辑复用与代码组织;
        当前的vue通过options Api (也就是选项式API)来组织代码结构，而最新的vue-next 则通过Composition API(组合式API)来处理逻辑关系

```javascript
    // old
    export default {
        data(){
            return{
                foo：1
            }
        },
        methods:{
            getFoo(){
                return this.foo;
            }
        },
        mounted(){
            console.log(this.getFoo()); 
        }
    }

    // new 
    import { ref , onMounted} from 'vue'
    export default {
        setup(props,ctx){
            const foo = ref(1);
            const getFoo = () => {
                return foo.value;
            }

            onMounted(()=>{
                console.log(getFoo());
            })

            return {
                foo,
                getFoo
            }
        }
    }
```

    (2)更好的类型推导(提供了更好的typescript支持)

```javascript
    // 这个不知道写什么,毕竟typescript还没学太多，后续再补上吧，很快也会去学ts了
```

    另外还有尤大提到的六个亮点:

    (1) Performance：性能更比Vue 2.0强。(update 性能提高1.3-2倍和ssr服务端渲染速度快2-3倍，基于bechmark)
    (2) Tree shaking support：可以将无用模块“剪枝”。
    (3) Composition API：组合API 相对于 Vue2.x 的Options API 
    (4) Fragment, Teleport, Suspense
    (5) Better TypeScript support：更优秀的Ts支持
    (6) Custom Renderer API：暴露了自定义渲染API

    怎么说呢，亮点很多，但是呢，作为一个小白，还是要扎扎实实的，先学会用，在深入探究其原理，
    所以呢，后续会对Composition API 以及 Custom Renderer API 都会加入实例测试，方便理解。
