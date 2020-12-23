/**
 * @description es6 函数扩展
 * @author lhl<15077887670@163.com>
 * @date 2020/12/23
 * */

// 函数默认值
{
    // 解构赋值 + 默认值
    function  foo({x,y= 5}){
        console.log(x,y);
    }

    foo({x:2,y:7})
    foo({x:1})
}

// 函数length
{
    // 函数的长度指没有指定默认值的参数个数（默认值参数不是尾部参数除外）
    console.log((function(a,b){}).length);
    console.log((function (a,b=3){}).length);
}

// name属性 函数名称
{
    function  foo(){}
    console.log(foo.name);
}

// 尾调用 函数的最后一步是调用另一个函数
{

}