/**
 * @description this file is created to print my own learning schedule,create schedule from 2020/09/20 to  2020/10/20
 * @date 2020/09/21
 */

/**
 * @description 创建前言
 */
function createPreface() {
  console.log(
    "哈哈，本人有时候比较懒，制定的计划未必能执行到位，所以，可能会有一定的调整，但是，最终，计划都是会执行下去的"
  );
}

/**
 * @description 打印2020/09/21 至 2020/10/21 之间的计划安排
 */
function printDiarySchedule() {
  console.log("\n");
  console.log(
    "                       ================= 学习时间表 =================                  "
  );

  console.log("");
  console.log(
    "                       2020/09/21 学习计划制定                            "
  );

  console.log("");
  console.log(
    "                       2020/09/22 学习vue3开课吧课程(课时1)                         "
  );

  console.log("");
  console.log(
    "                       (1) 完成飞机大战程序开发                                    "
  );
  console.log(
    "                       (2) 记录知识点，疑问，收获，总结                             "
  );

  console.log("");
  console.log(
    `                       2020/09/23 - 2020/09/24 计划有变，由于前一天的课时知识点密集，
                            因此需要更多时间消化                         `
  );

  console.log("");
  console.log(
    "                       2020/09/25 学习vue3开课吧课程(课时2)                         "
  );

  console.log("");
  console.log(
    "                       2020/09/26 回顾vue3所学知识点，整理笔记                     "
  );

  console.log("");
  console.log(
    "                       2020/09/27 由简入繁，先从mini-vue开始，奠定读vue3源码的基础                    "
  );

  console.log("");
  console.log(
    "                       (1) mini-vue暂定3天时间消化，一天时间总结(截止到30号)                  "
  );
  console.log(
    "                       (2) vue3的源码解读会相对滞后，大概要半个月后开始(哈哈，国庆还是要好好过的)                   "
  );

  console.log("");
  console.log(
    "                       2020/10/01 - 2020/10/08 基于所学，发散思维，自己写个小游戏(未实现，事情较多)                  "
  );

  console.log("\n");
}

/**
 * @description 创建后记
 */
function createPostscript() {
  console.log("why? 我为啥要创建后记，啊哈，就是为了完整一点，呦吼");
}

function printDiary() {
  createPreface();
  printDiarySchedule();
  createPostscript();
}

printDiary();
