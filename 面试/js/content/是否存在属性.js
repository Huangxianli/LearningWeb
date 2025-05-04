function test() {
  console.log('--- 是否存在属性 ------------------------------------');
  test1();
  test2();
}

const prototypeObj = {
  prototypeKey1: '',
};
const obj = Object.create(prototypeObj, {
  key1: {
    value: '',
    enumerable: true,
  },
  key2: {
    value: '',
    enumerable: false,
  },
  [Symbol.for('key3')]: {
    value: '',
  },
});

/**
 * Object.prototype.hasOwnProperty
 * 可以判断自身所有的 key
 */
function test1() {
  console.log('--- test1 ------------------------------------');
  const hasPrototypeKey1 = obj.hasOwnProperty('prototypeKey1');
  console.log(hasPrototypeKey1); // false

  const hasKey1 = obj.hasOwnProperty('key1');
  console.log(hasKey1); // true

  const hasKey2 = obj.hasOwnProperty('key2');
  console.log(hasKey2); // true

  const hasKey3 = obj.hasOwnProperty(Symbol.for('key3'));
  console.log(hasKey3); // true
}

/**
 * in 操作符
 * 可以判断自身以及原型上的所有 key
 */
function test2() {
  console.log('--- test2 ------------------------------------');

  const prototypeKey1In = 'prototypeKey1' in obj;
  console.log(prototypeKey1In); // true

  const key1In = 'key1' in obj;
  console.log(key1In); // true
  const key2In = 'key2' in obj;
  console.log(key2In); // true
  const key3In = Symbol.for('key3') in obj;
  console.log(key3In); // true
}

test();
