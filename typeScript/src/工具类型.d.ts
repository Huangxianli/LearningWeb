// 传入 tyoeof 对象，复制该对象的类型，同时可以协助显示完整的类型细节
type ObjectType<T> = {
  [K in keyof T]: T[K] extends object ? ObjectType<T[K]> : T[K];
  // [K in keyof T]: T[K]; 使用这个写法，循环引用类型有问题
};
const a12 = { a: 12, d: {}, b: { c: 12, d: {} } };
a12.d = a12;
type A = ObjectType<typeof a12>;
declare let a13: A;
a13 = {
  a: 1,
  d: a13,
  b: {
    c: 1,
    d: {},
  },
};

// 深度必需类型：递归地使对象所有属性变为必需
type DeepRequired<T extends object> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};
