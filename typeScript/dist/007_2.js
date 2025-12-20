// interface 和 type 的同名合并
// 同名的 type 或者 type 和 interface 同名时，会直接报错，因为 type 的设计就是确定的类型，不应该和其他的类型同名，如果不希望出现冲突的话，就使用 type
export const c = {
    // 如果是非重名的属性，会直接合并
    name: '',
    age: 1,
};
export const e = {
    name: '',
    getName() {
        // 将鼠标移到这上面可以看到有一个重载
        return '';
    },
};
