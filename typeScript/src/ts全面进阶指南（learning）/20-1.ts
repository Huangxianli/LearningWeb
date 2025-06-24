// @ts-nocheck

function test(): void {
  console.log(
    '--- ts-check 和 ts-nocheck --------------------------------------------------------------------'
  );

  // @ts-nocheck // 对整个文件都不进行 ts 类型检查，注意要放在文件的第一行第一个字符
  const a1: string = 1;

  // @ts-check // 对整个文件进行 ts 类型检查，还可以在 js 文件中通过类型推导和 JSDoc 的方式进行不完全的类型检查
  // 如果想要在 js 文件中也支持类型检查的功能，要在文件头部添加 // @ts-check
  /** @type {string}*/
  let b1: string;
  b1 = 123;
}

export { test };
