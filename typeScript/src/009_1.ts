/**
 * 交叉类型：
 * 1、同名属性，类型如果有交叉部分，最终的结果去交叉部分
 * 2、同名属性，类型如果没有交叉部分，最终取 never
 * 3、单独存在的属性，加入到最终结果中
 * 4、如果是函数，会产生函数重载
 */

export type A = {
  name: string;
};
export type B = {
  age: number;
};

export type C = A &
  B & {
    email: string;
  };

export const c: C = { name: '', age: 1, email: '' };
// 使用交叉类型，必须要每一项都满足

export type D = A & {
  name: '';
};
export const d: D = {
  // name: '1',
  name: '',
};
// 同名属性，有交集就取交集

export type E = A & { name: string | number };

export type F = A & { name: number };
// 同名属性，如果是冲突的，会被合并成 never，合并成 never 之后，该类型的对象中，必须存在该属性，而且该属性的类型只能是 never
declare let name: never;
// export const f: F = {}; // 会报错

export const f1: F = { name: name };

export type G = {
  (name: string): string;
};
export type H = G & {
  (name: string, age: number): string | number;
};
// 函数属性，会产生函数重载

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type PrettifyFn<T> = T extends Function
  ? T // 🌟 特殊处理：如果是函数，直接返回原类型 T
  : {
      [K in keyof T]: T[K];
    } & {};

type H1 = Prettify<H>;
type H2 = PrettifyFn<H>;
