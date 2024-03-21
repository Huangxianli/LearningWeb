/* 
break [labelName]语句 
brank语句可以用在循环、switch、块级作用域（必须带labelName）
 */

// 退出当前最内层的循环
function a1 () {
  let i = 0;
  let j = 0;
  while (i < 100) {
    while (j < 100) {
      if (i === 0 && j === 1) {
        break;
      }
      j++;
    }
    i++;
  }
  console.log("a1", i, j); //  100 100 
}
a1();

// 跳转到对应的循环外
function a2 () {
  let i = 0;
  let j = 0;
  label1: while (i < 100) {
    while (j < 100) {
      if (i === 0 && j === 1) {
        break label1;
      }
      j++;
    }
    i++;
  }
  console.log("a2", i, j); //  0 1 跳到label的下一个语句
}
a2();

// 跳转到对应的代码块
function a3 () {
  let i = 0;
  label1: {
    {
      if (i === 0) {
        break label1;
      }
    }
    i++; // 满足条件就跳到了目标label的下一个语句，不会再执行这一句
  }
  console.log("a3", i); // 0
}
a3();


/*
continue [lableName]
终止当前循环 | 标记循环的当前迭代， 并继续下一次的迭代循环
可以用在 for 和 while 循环中
*/

// 跳出当前的循环，并继续后面的循环
function b1 () {
  let i = 0;
  let j = 0;
  while (i < 100) {
    i++;
    if (j === 98) {
      continue; //  j是98的时候，就不会执行下面的语句了，直接进入下一次循环
    }
    j++;
  }
  console.log("b1", i, j); // 100 98
}
b1();

// 跳转到对应的label
function b2 () {
  let i = 0;
  let j = 0;
  let k = 0;
  label1: while (i < 10) {
    k++;
    label2: while (j < 9) {
      j++;
      if (j === 1) {
        continue label1;
      }
    }
    i++;
  }
  console.log("b2", i, j, k); // 10 9 11 当j === 1 的时候，跳到label1处，开启下一次循环，导致这里i和j就已经相差1了
}
b2();


/* 
switch 语句
 */
function c1 () {
  console.log("c1")
  let i = 1;
  switch (i % 1) {
    case 0:
      console.log(0);
    case 1:
      console.log(1);
      break;
    default:
      console.log("default");
  }
}
c1(); // 0 // 1 // 判断一个case就不再判断case；如果满足条件，执行到满足条件后的第一个break（中间忽略其他case判断），或者最后

function c2 () {
  console.log("c2")
  let i = 1;
  switch (i % 1) {
    case 0:
      console.log(0);
    case 1:
      console.log(1);
    default:
      console.log("default");
  }
}
c2() // 0 // 1 // "default"

function c3 () {
  console.log("c3");
  let i = 2;
  switch (i % 2) {
    case 0:
      i++; // 即使这里修改使得 case 1 满足也不会再执行case 1 里面语句
      console.log(0);
      break
    case 1:
      console.log(1);
      break
    default:
      console.log("default");
  }
}
c3(); // 0 有一次满足条件就不会继续判断了