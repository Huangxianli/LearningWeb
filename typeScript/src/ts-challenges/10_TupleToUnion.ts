export default {};

type TupleToUnion<T extends readonly any[]> = T[number];
type TupleToUnion1<T extends readonly any[]> = T extends readonly [
  infer U,
  ...infer Rest
]
  ? U | TupleToUnion1<Rest>
  : never;

type A1 = TupleToUnion<[1]>;
type A2 = TupleToUnion1<[1]>;

type B1 = TupleToUnion<[1, 2, 3, string]>;
type B2 = TupleToUnion1<[1, 2, 3, string]>;

const c = ['', 2] as const;
type C1 = TupleToUnion<typeof c>;
type C2 = TupleToUnion1<typeof c>;
