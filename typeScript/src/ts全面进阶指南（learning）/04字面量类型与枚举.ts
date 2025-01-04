function test(): void {
  console.log('---04字面量类型与枚举---------------------------------------------');

  test1();
  test2();

};

/**
 * 字面量类型与联合类型
 */
function test1(): void {
  console.log('---test1---------------------------------------------');

  test1_1();
  test1_2();
  test1_3();

};

/**
 * 字面量类型
 */
function test1_1(): void {
  console.log('---test1_1---------------------------------------------');
  let code: 200 = 200;
  // code = 300;
};

/**
 * 联合类型
 */
function test1_2(): void {
  console.log('---test1_2---------------------------------------------');

  type Code = 200 | 300;
  let code: Code = 200;
  code = 300;
  // code = true;
};

/**
 * 对象字面量类型
 */
function test1_3(): void {
  console.log('---test1_3---------------------------------------------');

  interface Temp {
    obj: {
      name: string;
    };
  };

  let temp: Temp = {
    obj: {
      name: ''
    }
  };
  // temp = {
  //   obj: {}
  // }
};

/**
 * 枚举
 */
function test2() {
  console.log('---test2---------------------------------------------');

  enum Items {
    Foo,
    Bar = 800,
  };

  const Foo = Items.Foo;

};


export default test;