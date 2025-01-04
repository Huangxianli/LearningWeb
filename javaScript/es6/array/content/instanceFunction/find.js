function test () {
  console.log('---Array.prototype.find()-----------------------------------------------');
  test1();
  test2();
  test3();
  test4();
  test5();
};

/**
 * find() 返回数组中满足提供的测试函数的第一个元素的值，否则返回undefined
 * Array.prototype.find(callback, thisObj);
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = Array.from(new Array(12), (ele, index) => ({ value: index % 4 }));
  const findData1 = arr1_1.find(ele => ele.value === 3);
  console.log('findData1: ', findData1); // { value: 3 }

  findData1.upData = 12;
  console.log('arr1_1[3]: ', arr1_1[3]); // { value: 3, upData: 12 } 同步修改了

  const findData2 = arr1_1.find(ele => ele.value === 5);
  console.log('findData2: ', findData2); // undefined
};

/**
 * 找到了第一个就立即停止
 */
function test2 () {
  console.log('---test2-----------------------------------------------');
  const arr2_1 = new Array(12).fill(12);
  const indexArr = [];
  arr2_1.find((ele, index) => {
    indexArr.push(index);
    return ele === 12;
  });
  console.log('indexArr: ', indexArr); // [0]
};

/**
 * 会访问empty的部分，同时在访问的时候，取值是严格等于 undefined 的
 */
function test3 () {
  console.log('---test3-----------------------------------------------');

  const arr3_1 = new Array(12).fill(12, 0, 2);
  const indexArr = [];
  arr3_1.find((ele, index) => {
    indexArr.push(index);
    return ele === undefined;
  });
  console.log('arr3_1: ', arr3_1); // [12, 12, empty...]
  console.log('indexArr: ', indexArr); // [0, 1, 2]
};

/**
 * find 是通用的方法，目标上要有length属性
 */
function test4 () {
  console.log('---test4-----------------------------------------------');
  const notArray1 = { length: 12 };
  const indexArr = [];
  const findData1 = Array.prototype.find.call(notArray1, (el, index) => {
    indexArr.push(index);
    return el;
  });
  console.log('indexArr: ', indexArr); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  console.log('findData1:', findData1); // undefined
};

/**
 * 在遍历的时候删除，或者减小长度
 */
function test5 () {
  console.log('---test5-----------------------------------------------');

  const arr5_1 = [1, 2, 0, 0, 5];
  const indexArr5_1 = [];
  const findData5_1 = arr5_1.find((el, index, arr) => {
    if (index === 0) {
      delete arr[1];
    }
    indexArr5_1.push(index);
    return arr5_1 < 1
  });
  console.log('indexArr5_1: ', indexArr5_1); // [0, 1, 2, 3, 4]
  console.log('findData5_1: ', findData5_1); // undefined 找到的是删除的部分

  const arr5_2 = [1, 1, 1, 1, 1];
  const indexArr5_2 = [];
  const findData5_2 = arr5_2.find((el, index, arr) => {
    if (index === 0) {
      arr.length = 3;
    }
    indexArr5_2.push(index);
    return el < 1;
  });
  console.log('indexArr5_2: ', indexArr5_2); // [0, 1, 2, 3, 4]
  console.log('findData5_2: ', findData5_2); // undefined
};


export default test;