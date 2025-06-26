type TupleToObject<T extends readonly (keyof any)[]> = {
  [K in T[number]]: K;
};
// 为什么要加 readonly ？
let a: any[] = [1, 2, 3];
let b: readonly any[] = [1, 2, 3];
// a = b; // readonly any[] 赋值给 any[] 会报错
b = a; // any[] 可以赋值给 readonly any[]

type A1 = TupleToObject<[1, 2]>;
const a2 = [1] as const;
type A2 = TupleToObject<typeof a2>;

export default {};
