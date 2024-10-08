# Module
> es6的模块功能可以取代CommonJs和AMD规范，成为浏览器和服务器通用的模块解决方案
> es6中的模块的设计思想是尽量的*静态化*，在编译阶段就可以知道，依赖关系，实际要导入和导出的内容是什么

> 注意，es6中模块不是对象，而是通过expoert命令显示的指定输出的代码，再通过import命令输入

### 严格模式
es6的模块已经开启了严格模式，无需要手动的写"use strict"
特别注意，在模块中，顶级的this不是指向window的，而是指向undefined，不应该在es6模块的顶层中使用this

### export命令
export用来规定模块的对外*接口*
import用来输入其他模块提供的功能

export目前可以输出
1. 变量（var let const）
2. class
3. function

````js
export { a };
export var a;
````

export规定的是对外的接口，必须与模块内的变量建立起一对一的关系
export 1; 这种写法是错误的
export a; 这种写法也是错误的
除去 export default a 这种写法，必须将变量放在{}形成接口名与模块内变量一对一的关系，或者export var a 这种写法

export输出的接口，对应的是值是*动态绑定*关系，即模块内部的值改变了，那么使用import引入该接口的地方的值也会发生改变

export 和 import 都不可以出现在块级作用域中（因为要静态分析的时候就要得到依赖关系，输入输出关系），只能出现在只要处于模块的顶层就可以，无论出现在哪个位置

### inmport 命令
export用来确定模块对外的接口，import用来在其他的模块中加载这些接口

*import 命令输入的变量都是只读的，他们的本质是接口*，不允许在加载模块里面改写接口

import 命令具有提升效果，会提升到整个模块的头部，最首先执行（import在编译阶段执行，在代码运行前执行）

import 命令不能出现在块级作用域中、不能用表达式和变量（静态执行的，存在提升）
如果过个import加载同一个文件的接口，会合并成一个import，只加载一次


###### as 
a as b：相当于重命名，将a重命名为b
**假如b是一个对象，修改b中的属性值，a中该属性值会同步的修改吗？？？**

### 模块的整体加载
"*" 指定一个对象，所有的输出都在这个对象上
import * as a from ...
**default 的内容也在这个上面吗？？？**

### export default 命令
为模块指定默认的输出 export default

````js
// a.js
export default 12; // 这种写法是可以的，相当于default是接口，把12赋值给了接口default
// b.js
import a from './a.js'; // a: 12
````

