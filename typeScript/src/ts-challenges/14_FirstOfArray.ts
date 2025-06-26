type FirstOfArray<T extends readonly any[]> = T extends [infer F, ...infer Rest]
  ? F
  : never;

type A1 = FirstOfArray<[]>;
type B1 = FirstOfArray<[1, 2]>;
type C1 = FirstOfArray<[[1], 2]>;
export default {};
