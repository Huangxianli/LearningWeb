/**
 * 交叉类型：
 * 1、同名属性，类型如果有交叉部分，最终的结果去交叉部分
 * 2、同名属性，类型如果没有交叉部分，最终取 never
 * 3、单独存在的属性，加入到最终结果中
 * 4、如果是函数，会产生函数重载
 */
export const c = { name: '', age: 1, email: '' };
export const d = {
    // name: '1',
    name: '',
};
// export const f: F = {}; // 会报错
export const f1 = { name: name };
