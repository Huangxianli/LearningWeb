export default {};

type Replace<S, F extends string, T extends string> = F extends ''
  ? S
  : S extends `${infer _B}${F}${infer _A}`
  ? `${_B}${T}${_A}`
  : S;

type A = Replace<'I am a boy', 'boy', 'girl'>;
type B = Replace<'I am a boy', '', 'girl'>;
