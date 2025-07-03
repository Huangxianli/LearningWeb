export default {};

type AppendArgument<F extends (...arg: any[]) => any, A> = F extends (
  ...arg: infer Arg
) => infer B
  ? (...arg: [...Arg, A]) => B
  : F;
type A = AppendArgument<() => boolean, string>;
type B = AppendArgument<(a: number) => boolean, string>;
