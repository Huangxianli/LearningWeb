export default {};

type LastOfArray<T extends readonly any[]> = T extends readonly [
  ...infer Rest,
  infer Last
]
  ? Last
  : never;

type A1 = LastOfArray<['1']>;
type A2 = LastOfArray<readonly ['1']>;
type A3 = LastOfArray<readonly []>;
type A4 = LastOfArray<readonly [2, 211, 3, string]>;
