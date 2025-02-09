function test() { }
;
function test1() {
    const dog1 = {
        name: '',
        age: 0,
        sex: false,
    };
    function a(cat) { }
    ;
    // 作为参数的时候，可以多出属性
    a(dog1);
    let cat1 = {
        name: '',
        age: 0,
        // sex: false,  定义的时候，不能多出任何的属性
    };
    cat1 = dog1; // 赋值的时候可以多出属性
    // dog1 = cat1; // 赋值的时候，不能少属性
    // 赋值的时候遵循的是鸭子类型系统，等号后面的变量的属性只能多不能少
}
;
export default test;
