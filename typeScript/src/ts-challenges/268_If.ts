export default {};

type If<I extends boolean, T, F> = I extends true ? T : F;

type A = 'a' extends string ? true : false;
type A1 = If<A, 1, 2>; // 1
