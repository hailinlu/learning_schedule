/**
 * @description 单例模式
 * @author lhl<15077887670@163.com>
 * @date 2020/12/24
 */

// 保证一个类只有一个实例，并提供一个访问它的全局访问点

/**
 * @description 获取全局对象
 * 用于存放唯一实例
 */
const getGlobalThis = () => {
    if (typeof self !== "undefined") return self;
    if (typeof window !== "undefined") return window;
    if (typeof global !== "undefined") return global;

    return globalThis;
}

/**
 * 当前单例将创建的实例挂载到全局对象
 * 实际运用中可以直接挂载到全局对象，此处只是做为一种方式进行说明
 */
{
    class Singleton {
        constructor() {
            this.name = "Singleton";
        }

        // 静态函数
        static getInstance() {
            let global = getGlobalThis();
            if (!global.singleton) {
                console.log("create")
                global.singleton = new Singleton();
                return global.singleton;
            }

            console.log("instance");
            return global.singleton;
        }
    }

    Singleton.getInstance();
    Singleton.getInstance();

    console.log(getGlobalThis().singleton);

    // 销毁实例
    delete getGlobalThis().singleton;
    console.log(getGlobalThis().singleton)
}

/**
 * @description 惰性单例
 */
{
     let getSingle = function (fn){
        let  instance;
        return function(){
            return instance || (instance = fn.apply(this,arguments));
        }
    }

    let createNumber = function() {
        let mask = {a: 1, b: 2};
        return mask;
    }

    let a = getSingle(createNumber);
    let t = a();
    let t1 = a();

    console.log(t,t1);
    t1.b = 5;
    console.log(t,t1);
}




