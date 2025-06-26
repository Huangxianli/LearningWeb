export default {};

type MyReadonly2<T, K = keyof T> = {
  readonly [K1 in keyof T as K1 extends K ? K1 : never]: T[K1];
} & { [K1 in keyof T as K1 extends K ? never : K1]: T[K1] };

type A1 = ObjectType<MyReadonly2<{ 1: string }>>;
type A2 = ObjectType<MyReadonly2<{ 1: string }, '2'>>;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type B1 = ObjectType<MyReadonly2<Todo, 'title' | 'description'>>;
