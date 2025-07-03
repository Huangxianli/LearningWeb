export default {};

type ReplaceAll<S, F extends string, T extends string> = F extends ''
  ? S
  : S extends `${infer _B}${F}${infer _A}`
  ? `${_B}${T}${ReplaceAll<_A, F, T>}`
  : S;

type A = ReplaceAll<'t y p e s', ' ', ''>;
type B = ReplaceAll<'my my my my my my ', 'm', ''>;
