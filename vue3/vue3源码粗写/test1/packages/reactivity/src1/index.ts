export * from './reactive';
export * from './effect';

/**
 * effect 会执行
 * 执行的时候，传入的副作用函数会执行
 * 副作用函数执行的时候会收集副作用函数
 * 修改属性值的时候会触发副作用函数的执行
 */