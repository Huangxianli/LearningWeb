export default {};

type TrimLeft<T extends string> = T extends ` ${infer R}` ? TrimLeft<R> : T;

type A = TrimLeft<'  a'>;
type B = TrimLeft<''>;
type C = TrimLeft<'  '>;
type D = TrimLeft<' b '>;
