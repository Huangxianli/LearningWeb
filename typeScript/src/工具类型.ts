// 传入对象，赋值该对象的类型
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
    d: {}
  }
};