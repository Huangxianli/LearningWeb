- [类](#类)
  - [类定义](#类定义)
  - [类构造函数](#类构造函数)
  - [示例、原型和类成员](#示例原型和类成员)
  - [继承](#继承)
  
# 类
es6的 class 虽然看起来是面向对象编程，实际上仍然是原型和构造函数的概念

## 类定义
类声明和类表达式
没有提升，受块级作用域限制


```js
class A {}; // 声明
const B = class {}; // 表达式

{
  class C {};
  // 只能在当前块及其子块作用域中访问 C
}

const D = class E {};
D.name; // 'E'
// E.name; // 表达式声明的类的这种写法会报错。E 只能在 class E {} 的括号读取，E 没有读取到，又要取他的 name 属性，就会报错

```

## 类构造函数
constructor 关键字用于在类定义内部的构造函数

类中的 constructor 其实是 className.prototype.constructor

在对类执行 new 操作的时候，调用的是这个函数

实例化
new 操作
1. 在内存中创建一个新对象
2. 新对象的 [[ Prototype ]] 指向构造函数的 prototype 属性
3. 构造函数内的 this 指向当前这个新创建的对象
4. 执行构造函数
5. 如果构造函数内没有 return，则返回新创建的这个对象


类其实就是一个特殊的函数，使用 typeof className 得到的是 'function'

> 注意，如果 className.constructor 访问的其实是 className[[ Prototype ]].constructor -> Function.prototype.constructor -> Function 
> 实际上访问的不是在 class 内部定义的 constructor 构造函数


## 示例、原型和类成员
1. 实例成员
   在使用 new 的时候，调用构造函数，可以为实例添加成员，可以是简单属性，也可以是方法，只不过都是表现在实例上
2. 原型方法与访问器
   定义类的原型上的方法成为原型方法
   [[ Get ]] 和 [[ Set ]] 访问器，在类中的定义的位置和原型方法是同级的，但是实际上是表现在原型上的
3. 静态方法
   直接定义在类上的方法是静态方法，使用 static 标识符表示
4. 非函数原型和类成员
   手动的在类上或者类的 prototype 上（不是在类的定义中定义的）成员，实际上不推荐这种写法，推荐在类的内部定义
5. 迭代器和生成器方法

## 继承
es6 类的继承实际也是使用原型链

1. 继承基础
   extends 关键字 可以继承任何拥有 [[ Constructor ]] 和原型的对象，不单单只是类，单纯的函数也可以被继承
2. 构造函数、HomeObject 和 super()
   派生类的方法可以通过 super 关键字引用它们的原型
   super 关键字只能在派生类的构造函数、实例方法和静态方法中使用

   es6 给类的构造函数（和实例方法）和静态方法内部添加了特性 [[ HomeObject ]]，指向定义该方法的对象。super 始终定义为 [[ HomeObject ]] 的原型
   > 在静态方法中，[[ HomeObject ]] 指向当前类，super 就指向 当前类的 [[ Prototype ]]，由于当前类的 [[ Prototype ]] 是指向 父类的（继承静态方法的实现），所以在静态方法中 super 就是指向父类
   > 在其他的方法中，[[ HomeObject ]] 是 类.prototype ，super 是 类.prototype[[ Portotype ]]，由于当前 类.prototype[[ Prototype ]] -> 父类.prototype（继承原型方法的实现），所以在其他方法中 super 指向父类.prototype

   + super 只能在派生类中使用
   + 不能单独的引用 super 关键字，要么作为函数调用，要么以 super. 的方式来使用
   + 在派生类的构造函数中，如果显示的定义了 constructor，那么就一定要在这里面调用 super()
   + 在派生类的构造函数中，如果还没有调用 super()，那么就还不能使用 this

3. 抽象基类
   可以被其他类继承，但是本身不会被实例化的
   利用 new.target === 类本身 来判断

   要求派生类必须定义摸一个方法
   在基类的构造函数中：
   if (typeof this.方法 !== 'function') {...}
   应为在执行父的构造函数之前， this[[ Prototype ]] 和 类.prototype 就已经建立了链接（new 操作的 2、3步）

4. 继承内置类型
   有些内置类型的方法会返回新的实例。默认情况下，返回的实例的类型和原始的实例的类型是一致的
   例如：
   ```js
   class A extends Array { };
   const a = new A;
   const b = a.filter(item => item);
   b instanceof A; // true

   // 可以通过下面的方式来修改
   class A extends Array {
    static get [Symbol.species]() {
      return Array
    }
   }
   ```



