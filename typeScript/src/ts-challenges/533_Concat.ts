export default {};

type Concat<T1 extends readonly any[], T2 extends readonly any[]> = [
  ...T1,
  ...T2
];

const a1 = [1, 2, 3] as const;
type A1 = Concat<typeof a1, []>;

type A2 = Concat<typeof a1, A1>;
