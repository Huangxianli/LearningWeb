# Module
## Module 的语法
> es6的模块功能可以取代CommonJs和AMD规范，成为浏览器和服务器通用的模块解决方案
> es6中的模块的设计思想是尽量的*静态化*，在编译阶段就可以知道，依赖关系，实际要导入和导出的内容是什么

> 注意，es6中模块不是对象，而是通过expoert命令显示的指定输出的代码，再通过import命令输入

### 严格模式
es6的模块已经开启了严格模式，无需要手动的写"use strict"
特别注意，*在模块中，顶级的this不是指向window的，而是指向undefined*，不应该在es6模块的顶层中使用this

### export 命令
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

export 规定的是对外的接口，必须与模块内的变量建立起一对一的关系
export 1; 这种写法是错误的
export a; 这种写法也是错误的
除去 export default a 这种写法，必须将变量放在{}形成接口名与模块内变量一对一的关系，或者export var a 这种写法

export输出的接口，对应的是值是*动态绑定*关系，即模块内部的值改变了，那么使用import引入该接口的地方的值也会发生改变
export {a} 和 import {a} 这两个 a 其实都是指向同一块栈内存的，后面修改a的时候，其实就是 将a指向的那块栈内存中存放的内容替换掉

注意，export default a 实际上导出的是default，是先将a指向的栈内存中存储的内容（地址或值），替换掉default指向的栈内存中存储的内容（地址或值），当a被重新赋值的时候，a指向的栈内存中存储的内容（地址或者值）就改变了，由于default和a指向的栈内存并不是同一块，所以default不会跟着改变。（赋值操作的本质是 将“=”后面的变量指向的栈内存中存储的内容（地址或值）替换掉给前面的变量指向的栈内存中存储的内容（地址或值）） 

export 和 import 都不可以出现在块级作用域中（因为要静态分析的时候就要得到依赖关系，输入输出关系），只能出现在只要处于模块的顶层就可以，无论出现在哪个位置

### import 命令
export用来确定模块对外的接口，import用来在其他的模块中加载这些接口

*import 命令输入的变量都是只读的，他们的本质是接口*，不允许在加载模块里面改写接口

import 命令具有*提升效果*，会提升到整个模块的头部，最首先执行（import在编译阶段执行，在代码运行前执行），但是他的优先级没有 function和var 高

```js
// A.js
import { b } from 'B.js';
console.log('b', b);
var a = 12;
export {a};
// B.js
import { a } from 'A.js';
console.log('a', a);
var b = 11;
export { b };

// maim.js
import * as main from 'A.js'
// a undefined
// b 11

// es6 module的循环依赖 通过 “模块地图”和“模块记录” 解决循环依赖问题
```

import 命令不能出现在块级作用域中、不能用表达式和变量（静态执行的，存在提升）
如果过个import加载同一个文件的接口，会合并成一个import，只加载一次

###### as 
a as b：相当于重命名，将a重命名为b
**假如b是一个对象，修改b中的属性值，a中该属性值会同步的修改吗？？？**

### 模块的整体加载
"*" 指定一个对象，所有的输出都在这个对象上
```js
import * as a from 'a.js';
```
**default 的内容也在这个上面吗？？？**
是的 a.default
> 注意即使是这种写法，对于export的内容的改变 和 import的内容的同步和前面普通的是一样。
> 即：a.default的不会同步，a.xxx会同步

### export default 命令
为模块指定默认的输出 export default，一个模块只能有一个默认输出

````js
// a.js
export default 12; // 这种写法是可以的，相当于default是接口，把12赋值给了接口default；本质就是将default后面的内容赋值给default
// b.js
import a from './a.js'; // a: 12
````

### export 与 import 的复合写法

```js
export { foo } from 'a.js';
// 相当于
import { foo } from 'a.js';
export { foo };
```
> 注意：这种复合写法只是做一个中转，在中转文件中，无法使用中转的内容
> 这种中转写法，即使是default 也要加括号 export { default } from 'a.js';

### 模块继承
```js
export * from 'a.js'; // 注意这种复合写法的 * 不包含 a.js 中的 default，但是如果是单纯的import * as a from 'a.js'中的 * 是包含default的
export let a = 12;
export default 1;
```

### 跨模块常量
建立专门的文件夹存放
constants 

### import()
import 命令会被js引擎*静态分析*，先于模块内的其他语句执行，import叫*连接*更合适
只能在当前模块的底层作用域中，不能在条件语句中执行，不能在其他作用域执行

import() 支持动态加载，返回一个promise对象

1. 按需加载
2. 条件加载
3. 动态模块路径

## Module 的加载实现
### 浏览器的加载
async：下载脚本的时候不中断渲染，下载完了该脚本就中断页面的渲染，直接执行该脚本，若有多个async不能保证async的脚本按照出现的顺序执行
defer：下载脚本的时候不会中断渲染，渲染完了再按照所有defer的脚本出现的顺序执行，若有多个defer，可以保证defer的脚本按照出现的顺序执行
```html
<!-- type="module" 默认的加了 defer 属性，也可以开启 async -->
<script type="module"></script>
```
1. 代码是在模块作用域中执行的，不是在全局作用域
2. 使用了 严格模式
3. import时 .js 不可以省略，也可以
4. 顶层的 this 指向 undefined
5. 同一模块加载多次，也只执行一次

### ES6 模块与 CommonJS 模块的差异

