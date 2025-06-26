export default {};

type Awaited<T> = T extends PromiseLike<infer P>
  ? P extends PromiseLike<any>
    ? Awaited<P>
    : P
  : never;

type A1 = Awaited<Promise<string>>;
type B1 = Awaited<Promise<Promise<1>>>;
type C1 = Awaited<string>;
