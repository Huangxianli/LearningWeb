- [创建对象](#创建对象)
  - [工厂模式](#工厂模式)
  - [构造函数模式](#构造函数模式)
  - [原型模式](#原型模式)
  - [对象迭代](#对象迭代)

# 创建对象
虽然可以使用 Object 构造函数或者对象字面量创建对象，但是还是有一些不足：如果是具有相同接口的对象，重复代码太多

## 工厂模式
```js
function createPerson(name, age, job) {
  const person = {
    name,
    age,
    job,
    sayName() {
      return this.name;
    };
  };
  return person;
};

const person1 = createPerson(1, 1, 1);
const person2 = createPerson(2, 2, 2);
const person3 = createPerson(3, 3, 3);
```

工厂模式：虽然在创建多个对象的时可以减少很多的代码，但是，在使用的时候，没有一个明确的标识是什么类型的对象

## 构造函数模式
```js
function Person() {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    return this.name;
  }
};

const person1 = new Person(1, 1, 1); // 如果没有参数，可以直接 new Person;
const person2 = new Person(2, 2, 2);
const person3 = new Person(3, 3, 3);

person1 instanceof Person; // true
```
new 操作符做了什么：
1. 在内存中创建一个新对象
2. 这个新对象内部的 [[ Prototype ]] 特性被赋值为构造函数的 prototype 属性
3. 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）
4. 执行构造函数内部的代码（给新对象添加属性）
5. 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象

构造函数模式：减少代码的同时，也带来了明确的标识符（可以通过 instanceof 来确定，或者 实例[[ Prototype ]].constructor 来获取）

缺点：每次在 new 的时候，如果实例里面有函数属性，就会重新创建一个新的函数，其实所有的实例应该都可以共用同一个函数的

## 原型模式
从构造函数ed prototype 上入手，在 prototype 上创建的实例和方法可以被 实例 共享
```js
function Person () {};
Person.prototype.name = 'name';
Person.prototype.age = 'age';
Person.prototype.sayName = function () {
  return this.name;
};

const person1 = new Person();
const person2 = new Person();
const person3 = new Person();
```

## 对象迭代
```js
Object.entries(); // 这个也会忽略 symbol 属性
```