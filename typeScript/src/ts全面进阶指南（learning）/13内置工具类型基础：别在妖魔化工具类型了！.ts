/**
 * 工具类型的分类
 * 1. 属性修饰工具类型
 * 2. 集合工具类型
 * 3. 模式匹配工具类型（基于 infer 的模式匹配，对一个既有的类型特定位置类型的提取）
 * 4. 模板字符串工具类型
 */
function test(): void {
  test1();
};

/**
 * 属性修饰工具类型
 * 主要使用属性修饰、映射类型与索引类型相关
 */
function test1(): void {
  type Partial<T> = { // 复制 T 并且属性都是可选的
    [P in keyof T]?: T[P];
    // 可以理解为 [P in keyof T]+?: T[P];
  };
  type Prequired<T> = { // 复制 T 并且所有属性都是必选的
    [P in keyof T]-?: T[P];
  };
  type Readonly<T> = { // 复制 T 并且所有属性都是只读的
    readonly [P in keyof T]: T[P];
  };

  interface A {
    name: string,
    age: number
  };
  const a: Partial<A> = {
    name: undefined,
    age: undefined,
  };
  type B = Partial<A>
  /* 
    type B = {
      name?: string | undefined;
      age?: number | undefined;
    } 
   */
  type C = Required<B>;
  /*
    type C = {
      name: string;
      age: number;
    }
   */

  interface D {
    name?: string;
  };
  const d: D = {
    name: undefined,
  };

  interface E {
    name: string | undefined;
  };
  type F = Required<E>;
  /* 
    type F = {
      name: string | undefined;
    }
   */

  interface G {
    name?: string | undefined,
  };
  type H = Required<G>;
  /* 
    type H = {
      name: string;
    }
   */
  const h: H = {
    // name: undefined,
    name: '',
  }


};
export default test;