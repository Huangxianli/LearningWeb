export default {};

type Capitalize<T extends string> = T extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${R}`
  : T;

type A = Capitalize<''>;
type B = Capitalize<'asdfasf'>;
