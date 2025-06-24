function test(): void {
  console.log(
    '--- 类型编程新范式：模板字符串工具类型进阶 ----------------------------------------'
  );
  test1();
  test2();
  test3();
}
/**
 * 从最简单的模式匹配说起：Trim、Includes StartWith...
 */
function test1(): void {
  console.log(
    '--- 从最简单的模式匹配说起：Trim、Includes 等 ----------------------------------------'
  );

  // 如果是单纯的字符串字面量类型，那么只有在两者完全相等的情况下才会 extends 的值为 true

  type Includes<
    Str extends string,
    Search extends string
  > = Str extends `${infer _B}${Search}${infer _A}` ? true : false;

  type Includes1 = Includes<'', ''>; // flase
  type Includes2 = Includes<'1', '1'>; // true

  /**
   * 分析：
   * '' extends `${infer _B}${''}${infer _A}` ? true : false
   * '' extends `${infer _B}${infer _A}` ? true : false
   * 这里的 _B 和 _A 需要被拆分，至少需要有一个字符；这里不能被拆分，所以得到的是 false
   */

  // 需要对查找空字符串进行特殊处理
  type IncludesSearch<
    Str extends string,
    Search extends string
  > = Search extends ''
    ? true
    : Str extends `${infer _B}${Search}${infer _A}`
    ? true
    : false;

  type IncludesSearch1 = IncludesSearch<'', ''>; // true
  type IncludesSearch2 = IncludesSearch<' ', ''>; // true
  type IncludesSearch3 = IncludesSearch<' 1', '  1'>; // false

  // Trim
  type TrimLeft<Str extends string> = Str extends ` ${infer V}`
    ? TrimLeft<V> // 如果这里不递归的话，就只能去除掉一个空格
    : Str;
  type TrimLeft1 = TrimLeft<'    1'>; //  '1'
  type TrimRight<Str extends string> = Str extends `${infer V} `
    ? TrimRight<V>
    : Str;
  type Trim<Str extends string> = Str extends ` ${infer V}` | `${infer V} `
    ? Trim<V>
    : Str;

  type Trim1 = Trim<'1'>; // '1'
  type Trim2 = Trim<' 1 '>; // '1'
  type Trim3 = Trim<'  1 '>; // '1'
  type Trim4 = Trim<' 1 2 '>; // '1 2'
  type Trim5 = Trim<' '>; // ''
  type Trim6 = Trim<''>; // ''

  type TrimTemp<Str extends string> = TrimLeft<TrimRight<Str>>; // 这种写法也是可以的

  type StartWith<
    Str extends string,
    Search extends string
  > = Str extends `${Search}${infer _A}` ? true : false;
  type StartWith1 = StartWith<'123', '1'>; // true
  type StartWith2 = StartWith<'123', ''>; // true
  type StartWith3 = StartWith<'', ''>; // true
}

/**
 * 结构转化：Replace Split 与 Join
 */
function test2(): void {
  console.log(
    '--- 结构转化：Replace、Split 与 Join ----------------------------------------'
  );
  test2_1();
  test2_2();
  test2_3();
}

/**
 * Replace
 * 将字符串字面量划分为目标部分与其他部分
 * 替换目标部分
 */
function test2_1(): void {
  console.log('--- Replace ----------------------------------------');

  type Replace<
    Str extends string,
    Search extends string,
    Replacement extends string
  > = Str extends `${infer _B}${Search}${infer _A}`
    ? `${_B}${Replacement}${_A}` // 这里实现替换
    : Str;

  type Replace1 = Replace<'123', '123', '1'>; // '1'
  type Replace2 = Replace<'', '', '1'>; // ''
  type Replace3 = Replace<' ', '', '1'>; // ' 1' // infer 会贪婪的尽可能匹配多的字符

  type _ReplaceAll<
    Str extends string,
    Search extends string,
    Replacement extends string
  > = Str extends `${infer _B}${Search}${infer _A}`
    ? _ReplaceAll<`${_B}${Replacement}${_A}`, Search, Replacement>
    : Str;

  type ReplaceAll1 = _ReplaceAll<'11123', '1', ''>; // '23'
  type ReplaceAll2 = _ReplaceAll<'1223', '12', '1'>; // '13' 并不符合 js 中的 replaceAll 的结果
  // const a = '1223'.replaceAll('12', '1'); // '123'

  type ReplaceAll<
    Str extends string,
    Search extends string,
    Replacement extends string
  > = Str extends `${infer _B}${Search}${infer _A}`
    ? `${_B}${Replacement}${ReplaceAll<`${_A}`, Search, Replacement>}`
    : Str;

  type ReplaceAll3 = ReplaceAll<'123', '1', '2'>; // ''223
  type ReplaceAll4 = ReplaceAll<'123', '1', '2'>; // ''223
  type ReplaceAll5 = ReplaceAll<'1223', '12', '1'>; // '123'
}

/**
 * Split
 */
function test2_2(): void {
  console.log('--- Split ----------------------------------------');

  type _Split<
    Str extends string,
    Sep extends string
  > = Str extends `${infer A1}${Sep}${infer A2}` ? [A1, A2] : [Str];

  type _Split1 = _Split<'1-2-3', '-'>; // ["1", "2-3"]

  type Split<Str extends string, Sep extends string> = Str extends Sep
    ? []
    : Str extends `${infer A1}${Sep}${infer A2}`
    ? [A1, ...Split<`${A2}`, Sep>]
    : [Str];

  type Split1 = Split<'1-2-3', '-'>; // ["1", "2", "3"]
  type Split2 = Split<'1-2-3-', '-'>; // ["1", "2", "3", ""]
  type Split3 = Split<'123', ''>; // ["1", "2", "3"]
  type Split4 = Split<'1-2_3', '-' | '_'>; //  ["1" | "1-2", "3"] | ["1" | "1-2", "2", "3"] 如果使用联合类型，得到的结果会很诡异
}

/**
 * Join
 */
function test2_3(): void {
  console.log('--- Join ----------------------------------------');

  type Join<
    List extends (string | number)[],
    Delimiter extends string
  > = List extends []
    ? ''
    : List extends [number | string, ...infer Rest]
    ? Rest extends [number | string]
      ? `${List[0]}${Delimiter}${Rest[0]}`
      : Rest extends []
      ? `${List[0]}`
      : `${List[0]}${Delimiter}${Join<
          Rest & Array<number | string>,
          Delimiter
        >}`
    : '';

  type _Join<List extends any[], Delimiter extends string> = List extends []
    ? ''
    : List extends [number | string, ...infer Rest]
    ? Rest extends []
      ? `${List[0]}`
      : `${List[0]}${Delimiter}${_Join<Rest, Delimiter>}`
    : '';

  type _Join1 = _Join<[1, 2], ','>; // '1,2,'

  type Join1 = Join<[1, 2], ','>; // '1,2'
  type Join2 = Join<[1], ','>; // '1'
  type Join3 = Join<[], '_'>; // ''

  type A<T> = T extends [number, ...infer Rest] ? Rest : never;
  type B = A<[]>;
}

/**
 * Case 转换
 */
function test3(): void {
  console.log('--- Case 转换 ----------------------------------------');
  type DelimiterCase2CamelCase<
    S extends string,
    Delimiter extends string
  > = S extends `${infer _B}${Delimiter}${infer _A}`
    ? `${Uncapitalize<_B>}${DelimiterCase2CamelCase<Capitalize<_A>, Delimiter>}`
    : S;

  type DelimiterCase2CamelCase1 = DelimiterCase2CamelCase<'hello_world', '_'>; // 'helloWorld'
}

export default test;
