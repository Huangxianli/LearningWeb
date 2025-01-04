function test () {
  console.log('---Array.prototype.toLocaleString()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * Array.prototype.toLocaleString(?locales, ?options) 方法返回一个字符串，表示数组中的所有元素。每个元素通过调用它们自己的 toLocaleString 方法转换为字符串，并且使用特定于语言环境的字符串（例如逗号“,”）分隔开
 * 
 * 分隔符的选择取决于主机当前的语言环境，而不是 locales 参数
 * 
 * 如果一个元素是 undefined、null，它会被转换为空字符串，而不是 "null" 或者 "undefined"
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = Array.from({ length: 12 }, (el, index) => index);
  const toLocaleSting1_1 = arr1_1.toLocaleString();
  console.log('toLocaleSting1_1: ', toLocaleSting1_1); // 0,1,2,3,4,5,6,7,8,9,10,11

  const arr1_2 = Array.of(1, [], 2, {}, 4);
  const toLocaleString1_2 = arr1_2.toLocaleString();
  console.log('toLocaleString1_2: ', toLocaleString1_2); //  1,,2,[object Object],4

  // 注意 [].toLocaleString() => ''; [1].toLocaleString() => '1'

  const arr1_3 = new Array(2);
  const toLocaleString1_3 = arr1_3.toLocaleString();
  console.log('toLocaleString1_3: ', toLocaleString1_3); // ,
};


/**
 * 访问稀疏数组，会访问 empty，会当成 undefined 来处理
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = Array.from(new Array(10), (item, index) => index);
  arr2_1.length = 20;
  const toLocaleString2_1 = arr2_1.toLocaleString();
  console.log('toLocaleString2_1: ', toLocaleString2_1); // 0,1,2,3,4,5,6,7,8,9,,,,,,,,,,
};

/**
 * splice() 是通用的，期望 this 上有 length，和非负整数项
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
  const toLocaleSting3_1 = Array.prototype.toLocaleString.call(notArray3_1)
  console.log('toLocaleSting3_1: ', toLocaleSting3_1); //  0,,2,3,,,,,,,,
};

export default test;