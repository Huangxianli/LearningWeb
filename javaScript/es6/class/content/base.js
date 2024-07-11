class A1 {
  console (data) {
    console.log(data);
  };
};

let a1_1 = new A1();
a1_1.console("执行了class A1 的 console 方法");


class A2 {
  constructor(x, y) { // 构造函数，其中的this就是当前new的实例
    this.x = x;
    this.y = y;
  };

  console () {
    console.log(`x是：${this.x}`);
    console.log(`y是：${this.y}`);
  };
};

const a2_1 = new A2(1, 2);
a2_1.console();

// 类的所有普通的方法都是绑定在类的prototype上的
class A3 {
  constructor() {
  };
  console () {
  }
};
const a3_1 = new A3();
console.log(a3_1.constructor === A3.prototype.constructor); // true
console.log(a3_1.console === A3.prototype.console); // true

// 类中的方法都是不可枚举的
class A4 {
  constructor() {
  };
  toString () {
  };
};

const A4ProtoKeys = Object.keys(A4.prototype);
console.log(A4ProtoKeys); // []

class B1 {
  constructor() {
    // constructor 默认会 return this，也就是当前的实例对象，可以手动的改变return
    return {};
  };
};
const b1_1 = new B1();
console.log(b1_1 instanceof B1); // false

