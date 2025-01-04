function test () {
  console.log('---Array.prototype.sort()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * Array.prototype.sort() 就地对数组的元素进行排序，并返回对相同数组的引用。默认排序是将元素转换为字符串，然后按照它们的 UTF-16 码元值升序排序
 * 会修改原数组
 * 
 * 没有提供回调的时候，会将非 undefined 的每一项都转化成 string，按照 unicode 码位进行排序
 * compareFn(a, b) 的返回值 >0 ，按照 b a 的顺序排列
 * compareFn(a, b) 的返回值 <0 ，按照 a b 的顺序排列
 * compareFn(a, b) 的返回值 =0 ，不改变 a b 的位置
 * 
 * 在参数顺序为 (a, b) 时：
 * 想升序就 a - b ，因为返回值 >0 时会按照 b a 排序
 * 想降序就 b - a ，因为返回值 <0 时会按照 a b 排序
 * 
 * 比较函数必须：
 * 纯函数：比较函数不会改变被比较的对象或任何外部状态。（这很重要，因为无法保证比较函数将在何时以及如何调用，因此任何特定的调用都不应对外部产生可见的效果。）
 * 稳定性：比较函数对于相同的输入对应始终返回相同的结果
 * 自反性：compareFn(a, a) === 0
 * 反对称性：compareFn(a, b) 和 compareFn(b, a) 必须都是 0 或者具有相反的符号
 * 传递性：如果 compareFn(a, b) 和 compareFn(b, c) 都是正数、零或负数，则 compareFn(a, c) 的符号与前面两个相同
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = Array.from({ length: 12 }, (el, index) => index);
  const arr1_2 = arr1_1.sort();
  console.log('arr1_2: ', arr1_2); // [0, 1, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9]
  console.log('arr1_1: ', arr1_1); // [0, 1, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9]

  const arr1_3 = arr1_1.sort((a, b) => -1);
  console.log('arr1_3: ', arr1_3); // [9, 8, 7, 6, 5, 4, 3, 2, 11, 10, 1, 0]

  const arr1_4 = arr1_1.sort((a, b) => a - b);
  console.log('arr1_4: ', arr1_4); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  const arr1_5 = arr1_1.sort((a, b) => b - a);
  console.log('arr1_5: ', arr1_5); // [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
};


/**
 * 访问稀疏数组，会访问 empty，并且 empty 会被移动到最后，undefined 会被放在所有 empty 的前面，其他值的后面
 * 只要调用了 sort() 就会排序
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = Array.from(new Array(10), (item, index) => index);
  arr2_1[1] = undefined;
  arr2_1.length = 20;
  arr2_1.sort();
  console.log('arr2_1: ', arr2_1); // [0, 2, 3, 4, 5, 6, 7, 8, 9, undefined, 空属性 × 10]

  arr2_1.sort((a, b) => b - a);
  console.log('arr2_1: ', arr2_1); //  [9, 8, 7, 6, 5, 4, 3, 2, 0, undefined, 空属性 × 10]
};

/**
 * sort() 是通用的，期望 this 上有 length，和非负整数项
 * 在 length 范围内的 empty 项，在最后会被删除
 */
function test3 () {
  console.log('---test3-----------------------------------------------');

  const notArray3_1 = {
    length: 12,
    0: 0,
    2: 2,
    3: 3,
    4: undefined,
    16: 16,
    a: 'a',
  };
  const sort3_1 = Array.prototype.sort.call(notArray3_1, (a, b) => a - b);
  console.log('sort3_1: ', sort3_1); // {0: 0, 1: 2, 2: 3, 3: undefined, 16: 16, length: 12, a: 'a'}
};

export default test;