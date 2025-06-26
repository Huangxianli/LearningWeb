type MyReadonly<T extends object> = {
  +readonly [K in keyof T]: T[K];
};

type A1 = Readonly<any[]>;
type A2 = MyReadonly<any[]>;

type B1 = Readonly<[string, number]>;
type B2 = MyReadonly<[string, number]>;

type C1 = Readonly<any>;
type C2 = MyReadonly<any>;

interface Todo {
  title: string;
  description: string;
}
type D1 = Readonly<Todo>;
type D2 = MyReadonly<Todo>;

export default {};
