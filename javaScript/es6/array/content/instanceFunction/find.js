function test () {
  console.log('---Array.prototype.find()-----------------------------------------------');
  test1();
  test2();
  test3();
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
  console.log('findData2: ', findData2); // undfined
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

function test3 () {
  console.log('---test3-----------------------------------------------');

  const arr3_1 = new Array(12).fill(12);
  const indexArr = [];
  arr3_1.find((ele, index) => {
    if (index === 1) {
      delete arr3_1[2];
    };
    indexArr.push(index);
    return ele === undefined;
  });
  console.log('indexArr: ', indexArr); // [0, 1, 2]
};



export default test;