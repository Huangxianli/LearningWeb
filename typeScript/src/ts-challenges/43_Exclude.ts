type MyExclude<T, U> = T extends U ? never : T;

type A1 = Exclude<'1' | '2', string>; // never
type A2 = MyExclude<'1' | '2', string>; // never

type B1 = Exclude<string, '1'>;
type B2 = MyExclude<string, '1'>;

type C1 = Exclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'
type C2 = MyExclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'

export default {};
