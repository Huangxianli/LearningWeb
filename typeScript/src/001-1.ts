interface A {
  [index: number]: any; // 需要注意，这个表明的其实不是数组，表示的是任何可以使用数字作为索引来访问其内容的对象，这个类型对应的变量不一定有数组的方法（pop、push 等），它包含了 1、真正的数组 2、所有 key 都能隐式被转化成数组类型的普通对象 3、类数组对象
}
export type { A };

function fn() {
  const args: A = arguments;
}

const obejct1: A = { 1: 1 };

// const object1_1: A = { 1: 1, 'a': 12 };
// 这里会报错，因为 'a' 不能隐式的转化成数字

const object2: A = [1, 2, 2];

export { fn, obejct1, object2 };
