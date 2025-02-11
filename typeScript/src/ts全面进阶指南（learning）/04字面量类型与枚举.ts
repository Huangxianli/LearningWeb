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
 * 字面量类型比原始类型更加得到精确，主要有数字字面量、字符串字面量、布尔字面量、对象字面量
 * 字面量类型要求的是值级别的一致
 * 
 * 注意，从本质上来将，字面量类型依旧是类型而不是值，在编译之后是会被移除的
 */
function test1_1(): void {
  console.log('---test1_1---------------------------------------------');
  let code: 200 = 200;
  // code = 300;
};

/**
 * 联合类型
 * 多个类型联合在一起
 * 如果是函数的话，需要使用括号括起来；如果是联合类型中进一步的联合，会被平铺到第一层
 * 可以利用联合类型实现互斥
 */
function test1_2(): void {
  console.log('---test1_2---------------------------------------------');

  type Code = 200 | 300;
  let code: Code = 200;
  code = 300;
  // code = true;

  type Test1_2_1 = (() => {}) | (1 | 2); // Test1_2_1: 1 | 2| (() => {})

  interface Test1_2_2 {
    data: {
      type: 1,
      sex: 'man'
    } | {
      type: 2,
      sex: 'woman'
    }
  };
  const test1_2_2_1: Test1_2_2 = {
    data: {
      type: 1,
      // sex: 'woman', // 利用联合类型实现了互斥，type 为 1 的时候，sex 只能为 man，不能为其他的内容
      sex: 'man'
    }
  }
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
 * 成组的常量，最好都用枚举类型来代替
 * 如果给某一个成员制定了值，那么之前未赋值的成员会从 0 开始，之后的成员会从该值递增
 * 枚举值是延迟求值
 * 枚举值是双向映射的，可以从枚举成员映射到枚举值，也可以从枚举值映射到枚举成员（注意只有枚举值数字时才能进行双向映射，即使是字符串也不行）
 * 
 * 常量枚举，常量枚举是单向映射的，只能通过枚举成员访问枚举值
*/
function test2() {
  console.log('---test2---------------------------------------------');

  enum Items {
    Foo,
    Bar = 800,
  };

  const Foo = Items.Bar;
  const Zero = Items[800];

  const enum Item1 {
    Foo = 0,
  };
  // const Zero1 = Item1[0]; // 会报错
};


export default test;