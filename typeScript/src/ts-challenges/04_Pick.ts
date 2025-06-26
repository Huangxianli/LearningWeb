type MyPick<T extends object, K extends keyof T> = {
  [Key in K]: T[Key];
};

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
// type A1 = Pick<Todo, 'a'>;
// type A2 = MyPick<Todo, 'a'>;

type B1 = Pick<Todo, 'title'>;
type B2 = MyPick<Todo, 'title'>;

type C1 = Pick<Todo, 'title' | 'completed'>;
type C2 = MyPick<Todo, 'title' | 'completed'>;

export default {};
