export default {};

type Trim<T extends string> = T extends ` ${infer R}` | `${infer R} `
  ? Trim<R>
  : T;

type A = Trim<''>;
type B = Trim<' '>;
type C = Trim<' q'>;
type D = Trim<' x '>;
type E = Trim<' d d '>;
