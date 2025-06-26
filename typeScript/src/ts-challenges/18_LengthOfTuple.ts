type LengthOfTuple<T extends readonly any[]> = T['length'];
type A1 = LengthOfTuple<[]>;
const b = [1, 2] as const;
type B1 = LengthOfTuple<typeof b>;

export default {};
