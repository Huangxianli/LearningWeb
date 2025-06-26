export default {};
// declare const promiseAll: PromiseAll;

// type Array1<T extends readonly PromiseLike<any>[]> = T extends readonly [
//   infer F,
//   ...infer Rest
// ]
//   ? Rest extends readonly PromiseLike<any>[]
//     ? [F, ...Array1<Rest>]
//     : [F]
//   : [];

type PromiseAll = <T extends readonly PromiseLike<any>[], U =[]>(
  arg: T
) => Promise<[T extends readonly [infer F, ...infer Rest] ? ]>;

// const promise1 = Promise.resolve(3);
// const promise2 = 42;
// const promise3 = new Promise<string>((resolve, reject) => {
//   setTimeout(resolve, 100, 'foo');
// });
// const a = [promise1, promise2, promise3] as const;
// type A = Array1<typeof a>;
