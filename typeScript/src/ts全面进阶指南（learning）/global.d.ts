interface MyType1<T> {
  name: string;
  age: number;
  myType: T;
}
interface MyType2<T = string> {
  name: string;
  age: number;
  myType: T;
}

//  声明模块，为第三方模块添加类型声明
declare module '*20-2.declareModuleTest.js' {
  export default function handler(): boolean;
  export const PI: 3.14;
}

// import './20-3.declareModuleTest1.js';

declare module '*20-3.declareModuleTest1.js' {
  interface A {
    a: string;
  }
}
// 对 md 文件进行类型声明
declare module '*.md' {
  const raw: string;
  export default raw;
}

// 扩展 Window 接口，同名的接口会自动合并
interface Window {
  newFunc: () => void;
}

//  如果要扩展 @types/ 下的包的类型，可以通过同名模块的方式进行扩展
declare module 'fs' {
  export function bump(): void;
}