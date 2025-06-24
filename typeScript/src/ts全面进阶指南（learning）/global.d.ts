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

interface Window {
  newFunc: () => void;
}
