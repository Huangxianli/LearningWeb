function test(): void {
  console.log('---05函数与 Class 中的类型---------------------------------------------');

  test1();
};

/**
 * 函数
 */
function test1(): void {
  console.log('---test1---------------------------------------------');

  test1_1();
};

/**
 * 函数的类型签名
 */
function test1_1(): void {
  console.log('---test1_1---------------------------------------------');

  const fun1 = function (a: number): void { };
  const fun2: () => number = () => { return 1 };
  const fun3 = (a: number): number => { return 1 };

  interface Fun4 {
    (a: number): void
  };
  const fun4: Fun4 = (a) => { };

  type Fun5 = (a: number) => number;
  const fun5: Fun5 = a => 1;
};

/**
 * void 类型
 */
function test1_2(): void {
  console.log('---test1_2---------------------------------------------');

  function test1_2_1(): void {
    // 没有return
  };
  function test1_2_2(): void {
    return; // 有 return 但是没有具体的值，其实这个函数的返回值用 undefined 会更好 
  };
  function test1_2_3(): undefined {
    return;
  }
};

/**
 * 可选参数与 rest 参数
 */
function test1_3() {
  console.log('---test1_3---------------------------------------------');

  function test1_3_1(a: number, b?: number): void { };
  test1_3_1(1);
  test1_3_1(1, 1);

  function test1_3_2(a: number, b: number | string = 12): void { };
  test1_3_2(1);
  test1_3_2(1, 2);

  function test1_3_3(a: number, ...b: (string | number)[]) { };
  function test1_3_4(a: number, ...b: [number, string]) { };
};

/**
 * 函数签名重载，利用函数签名重载，可以更好的推断出返回值的类型，在有多种入参方式的时候，可以匹配入参方式，获取到对应的返回值的类型
 */
function test1_4(): void {

  function test1_4_1(foo: number, bar?: boolean): string | number {
    if (bar) {
      return foo;
    } else {
      return String(foo);
    }
  };

  const a = test1_4_1(1); // a 的类型被推导成 string | number

  function test1_4_2(foo: number, bar: true): number
  function test1_4_2(foo: number, bar?: false): string
  function test1_4_2(foo: number, bar?: boolean): string | number {
    if (bar) {
      return foo;
    } else {
      return String(foo);
    }
  };
  const b = test1_4_2(1); // b 的类型准确的推导成了 string
}; 