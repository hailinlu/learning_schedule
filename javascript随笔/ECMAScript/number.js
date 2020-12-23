/**
 * @description ES6 数值扩展
 * @author lhl<15077887670@163.com>
 * @date 2020/12/23
 */

// isFinite/isNaN
{
    console.log(Number.isFinite(15));
    console.log(Number.isFinite(NaN));

    console.log(Number.isNaN(NaN));
    console.log(Number.isNaN(15));
}

// EPSILON(极小常量) 为浮点数计算设置误差范围
{
    console.log(Number.EPSILON);
}

// isSafeInteger 安全整数 用于表示是否超出整数范围
{
    console.log(Number.isSafeInteger(1233));
    console.log(Number.isSafeInteger(9007199254740992));
    // 整数超出范围可用大整数表示
    console.log(BigInt(9007199254740992));
}

// trunc 截断小数
{
    console.log(Math.trunc(1.4));
    console.log(Math.trunc("123.33"));
}

// sign 判断数值的正/负/零
{
    console.log(Math.sign(0));
    console.log(Math.sign(-5));
    console.log(Math.sign(4));
}

// hypot 求所有参数的平方和的平方根
{
    console.log(Math.hypot(3,4));
    console.log(Math.hypot(3));
}
