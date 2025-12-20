/**
 * 接口通过 extends 关键字来实现继承
 * 1、如果是同名属性，子类型应该和父类型相同或者是付类型的子类型
 * 2、如果是同名属性，子类型有超出父类型的部分，不报错
 * 3、子类型可以在父类型的基础上添加父类型没有的属性
 */

export interface A {
  name: string;
  age: number;
}
export interface A1 extends A {
  email: string;
}

export interface A2 extends A {
  name: '123';
  getName(): string;
}

export const a2_1: A2 = {
  name: '123',
  age: 12,
  getName: () => {
    return a2_1.name;
  },
};

export interface B {
  getName(): string;
}

export interface B1 extends B {
  getName(): '' | 'a';
}
