function test() {
  console.log('--- proxy -------------------');

  test1();
}

function test1() {
  console.log('--- test1 -------------------');

  test1_1();
  test1_2();
}
function test1_1() {
  console.log('--- test1_1 -------------------');
  const originObj = {};
  const obj = new Proxy(originObj, {
    get(target, propKey, receiver) {
      console.log('进入了 obj 的 get');
      console.log(target === originObj); // true
      return Reflect.get(target, propKey, receiver);
    },
    set(target, propKey, value, receiver) {
      console.log('进入了 obj 的 set');
      return Reflect.set(target, propKey, value, receiver);
    },
  });

  obj.name;
}

/**
 * Proxy
 * @param {Object} 需要代理的目标对象
 * @param {ProxyHandler} 配置对象，如果其中没有对于任何一个行为进行代理，那么访问返回的代理器对象等同于直接通向原对象（注意这个时候源对象和返回的代理器对象不是一个对象）
 * @return {Proxy} 代理器对象
 */
function test1_2() {
  console.log('--- test1_2 -------------------');

  const originObj = { name: 'originObj' };

  const obj = new Proxy(originObj, {
    get(target, propKey, receiver) {
      return 12;
    },
  });
  console.log('obj.name', obj.name); // 12
  console.log('obj.age', obj.age); // 12

  const originObj1 = { name: 'originObj1' };
  const obj1 = new Proxy(originObj1, {});
  console.log('obj1.name', obj1.name); // originObj1
  console.log('obj1.age', obj1.age); // undefined
  console.log(originObj1 === obj1); // false
  obj1.age = 12;
  console.log('originObj1.age', originObj1.age); // 12
}

test();
