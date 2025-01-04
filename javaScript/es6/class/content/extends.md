- [Class 的继承](#class-的继承)
  - [私有属性和私有方法的继承](#私有属性和私有方法的继承)
  - [静态属性和静态方法的继承](#静态属性和静态方法的继承)
  - [Object.getPrototypeOf()](#objectgetprototypeof)
  - [super 关键字](#super-关键字)
  - [类的 prototype 属性和 __proto__ 属性](#类的-prototype-属性和-proto-属性)
  - [原生构造函数的继承](#原生构造函数的继承)
  - [Mixin 模式的实现](#mixin-模式的实现)

# Class 的继承
在 es6 中使用 extends 关键字实现继承，但是实际上还是基于原型链的继承，只不过在表面上更加的清晰

es6 规定在派生类中，必须要在 constructor() 方法中调用 super()，否则就会报错，除非派生类中没有手动写 constructor()（没有写的话，js会自动的添加上 constructor() 并在其中自动的调用 super()）。如果不低调用 super() 就无法获取派生类自己的 this

es6 的继承是 先将父类的属性和方法，加到一个空的对象上，在将该对象作为派生类的实例。“继承在前，实例在后”，super() 就是在调用基类的 constructor() 得到一个继承基类的 this 的对象，没有这一步就无法继承父类
而且不能在 super() 之前使用 this
> 这说明 创建一个派生类的实例，基类的构造函数一定会执行一次

## 私有属性和私有方法的继承
基类的所有属性和方法可以被继承，除了私有属性和私有方法

可以通过在基类中的非私有方法来暴露基类的私有方法，这样可以在派生类中访问基类的非私有方法来访问基建类中的私有方法和私有属性

## 静态属性和静态方法的继承
基类的私有属性和私有方法也会被继承
A[[ prototype ]] -> B

注意静态属性和静态方法并不是通过拷贝实现继承的，而是通过原型链来实现继承的

静态方法是不可以遍历的，但是静态属性现在在浏览器的表现是可以遍历的

## Object.getPrototypeOf()
获取对象的隐式原型对象

Object.getPrototypeOf(ChildClass) === Father

Object.getPrototypeOf(ChildClass.prototype) === Father.prototype

## super 关键字
super 可以当成函数使用，也可以当成对象使用，但是不能单独的引用

类中的方法有 [[ HomeObject ]]，指向创建归方法的对象，例如，静态方法就指向类自己，原型方法就指向 类.prototype；super 又指向 [[ HomeObject ]] 的 [[ Prototype ]]

super() 的作用是生成子类的 this，将父类实例属性和方法放到这个 this 对象上。在调用 super() 之前是没有 this 对象的。

调用 super() 其实更像 Father.prototype.constructor.call(this);这个时候父类的构造函数中的 this 是指向 子的实例的，也就是直接将父的实例属性和方法浅拷贝到子的实例上
但是由于调用 super() 的那一刻，调用父的构造函数，但是这个时候没有子还没有this，那么如果遇到 this.XXX 的读取的话，就会尝试读取父的实例属性

super() 方法，只能在派生类的构造函数中调用，不能在其他的函数中调用
super 作为对象的时候，在普通方法中，指向的基类的原型对象；在静态方法中，指向的是基类。要注意，无法用过 super.XXX 的方式来访问基类的实例方法和实例属性
派生类的实例方法中 super.XXX() -> super.XXX.call(this) 这个时候，XXX 中的 this 指向的是调用的该实例方法对象，一般是派生类的实例
派生类的静态方法中 XXX 中的 this 指向的是调用该静态方法的对象，一般是指派生类本身
在使用 super.XXX 进行赋值的时候，要注意，我们应该直接把 super 当成 this，谁调用就指向谁

## 类的 prototype 属性和 __proto__ 属性
派生类[[ Prototype ]] -> 基类 （静态属性和静态方法的继承）
派生类.prototype[[ Prototype ]] -> 基类[[ Prototype ]] （原型属性和原型方法的继承）

Object.setPrototypeOf(派生类, 基类);
Object.setPrototypeOf(派生类.prototype, 父类.prototype);

实例的 [[ Prototype ]] 指向的是类的 prototype 属性

## 原生构造函数的继承
在类出现以前是不能继承原生构造函数的，类出现以后就可以了

class A extends Array {};

## Mixin 模式的实现
是指多个对象组合成一个新的对象，新的对象具有各个成员的接口

