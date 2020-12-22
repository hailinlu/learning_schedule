/**
 * @description es6 正则表达式
 * @author lhl<15077887670@163.com>
 * @date 2020/12/22
 * */

// y修饰符-粘连 隐含了头部匹配标志
{
    let str = "aaa_aa_a";
    let reg = /a+/y;

    console.log(reg.exec(str));
    console.log(reg.exec(str));
}

// y修饰符与g修饰符结合才能匹配所有的元素
{
    let str = "a1a2a3";
    let reg = /a\d/gy;

    console.log(str.match(reg));
    // sticky 表示是否设置了y修饰符
    console.log(reg.sticky);
}

// s修饰符 dotAll模式
{
    let reg = new RegExp("foo.bar","s");
    console.log(reg.test('foo/nbar'));
}

// 先行断言和先行否定断言
{
    // 先行断言：x只有在y前面才匹配
    let reg1 = new RegExp(/\d+(?=%)/,'g');
    // 先行否定断言：x只有不在y前面才匹配
    let reg2 = new RegExp(/\d+(?!%)/,'g');
    console.log(reg1.exec("100% of US presidents have been male"));
    console.log(reg2.exec("that's all 44 of them"));
}

// 后行断言和后行否定断言 与上述相反
{
    let reg1 = /(?<=\$)\d+/;
    let reg2 = /(?<!\$)\d+/;

    console.log(reg1.exec("BenJamin Franklin is on the $100 bill"));
    console.log(reg2.exec("it's worth about €90"));
}