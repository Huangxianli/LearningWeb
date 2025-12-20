/* instanceof 操作符，直接判断是否是一个类型的实例 */

function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toLocaleUpperCase());
  }
}

interface Interface1 {
  name: string;
  getName: () => string;
}
// "instanceof" 表达式的右侧必须是类型 "any"、类、函数或其他可分配给 "Function" 接口类型的类型，或者是具有 "Symbol.hasInstance" 方法的对象类型
declare const Interface1Const: Interface1;
function testInstanceof(value: Interface1 | string) {
  // if (value instanceof Interface1Const) } // 会报错
}

type Fun1 = (name: string) => string;
declare const Interface2Const: Fun1;
function testInstanceof2(value: Fun1 | string): string {
  if (value instanceof Interface2Const) {
    return value('');
  }
  // return value;
  return '';
}

abstract class Class1 {
  // abstract name: string;
  public abstract getName(): string;
}

class Class2 implements Class1 {
  private name = '';
  public getName(): string {
    return this.name;
  }
}
