export default {};

type Parameters<F extends (...arg: any[]) => any> = F extends (
  ...any: infer P
) => any
  ? P
  : never;

const a1 = (a: string, b: number) => {};
type A1 = Parameters<typeof a1>;
