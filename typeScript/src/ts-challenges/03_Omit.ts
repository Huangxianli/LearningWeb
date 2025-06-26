export default {};

type MyOmit<T extends object, K> = {
  [K1 in keyof T as K1 extends K ? never : K1]: T[K1];
};

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type A = MyOmit<Todo, 'description' | 'title'>;
