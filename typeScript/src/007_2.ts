// interface 和 type 的同名合并
// 同名的 type 或者 type 和 interface 同名时，会直接报错，因为 type 的设计就是确定的类型，不应该和其他的类型同名，如果不希望出现冲突的话，就使用 type

export type A = {};
//export type A = {}; // A 重复了，报错
// export interface A {} // A 重复了，报错

/**
 * 同名的 interface 会合并，如果是开发公共库，而且有些类型要用户自己来扩展的话，使用 interface
 * 合并规则：
 * 1、如果是非同名属性，直接添加
 * 2、如果是同名属性，但是是非方法签名，同名属性必须要指向的集合要完全相等，否则报错
 * 3、如果是同名方法签名，那么两者会合并成函数重载，合并的函数重载的顺序是 LIFO 的，最终解析之后在后面的声明会重载到前面，所以写的时候要注意，越精确的要放在越后面
 */

export interface B {}
export interface B {} // interface 可以重名，两个重名的会合并

// interface 合并规则
export interface C {
  name: string;
}
export interface C {
  age: number;
}
export const c: C = {
  // 如果是非重名的属性，会直接合并
  name: '',
  age: 1,
};

export interface D {
  name: string;
  age: number;
}

export interface D {
  // name: string | number; // 同名属性，不能范围更大
  // name: ''; // 同名属性不能范围更小
  age: number;
}

export interface E {
  name: string;
  getName(): string; // 注意这样才会吧 getName 当成方法签名，getName: () => string 这样不会，这样会被当成属性签名，属性签名是不会自动合并成函数重载的
}
export interface E {
  name: string;
  getName(name: string): void;
}

export const e: E = {
  name: '',
  getName() {
    // 将鼠标移到这上面可以看到有一个重载
    return '';
  },
};
