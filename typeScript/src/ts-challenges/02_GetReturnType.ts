export default {};

type GetReturType<T extends (...arg: any) => any> = T extends (
  ...arg: any
) => infer R
  ? R
  : never;

const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type A1 = GetReturType<typeof fn>;
