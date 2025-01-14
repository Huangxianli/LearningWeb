js是一门 ***单线程***的***非阻塞***的脚本语言。  
> 单线程: 保证执行顺序,例如连个dom的操作等等,但是这样限制了js的执行效率,所以衍生了web work技术  
 非阻塞：当异步（前代码无法立即返回结果）的时候，主线程会挂起这个任务，在异步任务返回结果的时候，再根据一定的规则去执行相应的回调。

如何实现的非阻塞??? --事件循环（event loop）  

### 执行栈和事件队列
当一个脚本第一次执行的时候，js引擎会解析代码，并且将其中的同步代码按照执行顺序加入执行栈中，然后从头开始执行。如果当前执行的是一个方法，那么js会向执行栈中添加这个方法的执行环境，然后进入这个执行环境继续执行其中的代码。当这个执行环境中的代码执行完毕并且返回结果之后，js会退出这个执行环境并销毁这个执行环境，回到上一个方法的执行环境。

js引擎遇到一个异步事件后，并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务。当一个异步事件返回结果之后，js回见这个事件加入与当前执行栈不同的一个队列中，称之为***事件队列***；被放入到事件队列中不会立即执行其回调，而是等待当前执行栈中所有任务都在执行完毕，主线程处于闲置状态的时候，主线程会查找事件队列中是否有任务。如果有，主线程会取出排在第一的事件，并将这个事件对应的回调放入执行栈中，然后执行同步代码...一直这样反复

### 规范中基本概念
* 一个事件循环有一个或多个任务队列（任务队列是宏任务队列）
* 每个事件循环都有一个微任务队列
* 每个任务队列 = 宏任务队列 != 微任务队列
* 任务可以被推入宏任务队列或微任务队列
* 当一个任务被推入队列（宏/微）时，我们意味着准别工作已经完成，所以现在可以执行该任务

### 事件循环的基本模型
1、 选择任务队列中最旧的任务（任务A）  
2、 如果任务A是空的（意味着任务队列为空），跳转到任务6  
3、 将“当前运行的任务”设置为“任务A”  
4、 运行“任务A”（表示当前的回调函数）  
5、 将“当前正在运行的任务”设置为空，删除“任务A”  
6、 执行为任务队列  
  * a、 选择微任务队列中最旧的任务（任务X）  
  * b、 如果任务X为空（意味着微任务为空），跳转到g  
  * c、 将“当前运行的任务”设置为“任务X”  
  * d、 运行“任务X” 
  * e、 将“当前运行的任务”设置为空，删除“任务X” 
  * f、 选择微任务队列的下一个最旧的任务，跳转到步骤b 
  * g、 完成微任务队列  

7、 跳转至步骤1  

### 简化流程
1、 运行宏任务队列中最旧的任务，然后将其删除。  
2、 运行微任务队列中的所有可用任务，然后将其删除。  
3、 下一轮：运行宏任务队列中的下一个任务（跳步骤2）  

### 需要记住的事情
1、 当一个任务（在宏任务队列中）运行时，可能会注册一个新的事件。因此可能会创建新的任务  
2、 微任务队列中的任务将在本轮运行，而宏任务队列中的任务必须等待下一轮事件循环  
3、 我们都知道“click”，“scroll”，“ajax”，“setTimeout”...的回调都是任务，但是我们还应该记住脚本标签中的js代码作为一个整体也是一个任务（宏任务）  


### 宏任务
* script整体代码
* setTimeout/setInterval
* I/O
* UI渲染
* postMessage
* MessageChannel
* requestAnimationFrame
* setImmediate(Node.js)

### 微任务
* new Promise().then()
* MutationObserver
* process.nextTick(Node.js)


```javascript
console.log('script start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

Promise.resolve()
  .then(function () {
    console.log('promise1')
  })
  .then(function () {
    console.log('promise2')
  })

console.log('script end')
```