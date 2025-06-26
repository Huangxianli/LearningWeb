export default {};

type Pop<T extends readonly any[]> = T extends readonly [...infer R, infer L]
  ? L
  : never;
