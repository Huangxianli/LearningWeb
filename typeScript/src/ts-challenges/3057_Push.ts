export default {};

type Push<T extends readonly any[], D> = [...T, D];

type A1 = Push<[1, 2], 1>;
