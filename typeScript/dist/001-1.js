function fn() {
    const args = arguments;
}
const obejct1 = { 1: 1 };
// const object1_1: A = { 1: 1, 'a': 12 };
// 这里会报错，因为 'a' 不能隐式的转化成数字
const object2 = [1, 2, 2];
export { fn, obejct1, object2 };
