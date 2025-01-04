# Promise
### Prmise的特点：
1. 对象的状态不受外界的影响
2. 一旦状态发生改变，就不会改变，任何时候都能得到这个结果

#### Promise的缺点
1. 一旦开始就无法中途取消
2. 如果不设置回调函数，Promise内部抛出的错误不会反应到外部
3. 当处于pending状态的时候，无法知道是刚开始还是快结束了

#### then中指定的回调函数，会在当前脚本所有的同步任务执行完才会执行
**那么catch中的回调函数是不是也是这样的呢？？？**

### new Promise(function(resolve, reject) {})中的resolve和reject
1. reject函数的参数通常是Error对象的实例
2. resolve函数的参数可以是正常值，也还肯能是一个Promise
**那么reject函数的参数可以是一个Peomise实例吗？？？**
3. resolve函数的参数如果是个Promise对象，那么该参数的状态会传递给resolve所在的Promise实例，或者说，会等待resolve中的Promise的状态，在决定进入那个回调中
   > 也就是说，resolve中如果是一个Promise的时候，不一定就会进入then()的第一个回调

   **如果reject中传递的是一个Promise，会等待这个Promise的状态再进入回调吗，传递的参数是一个Promise吗？？？**
4. 使用resolve()或者reject()并不终结Promise的参数的函数的执行
   > 因为：*立即resolve的Promise会在本轮事件循环的末尾执行*

   **立即reject的Promise也是在本轮的事件循环的末尾执行吗？？？**
   **resolve(data)，如果data是一个函数，那么这个函数是在什么时候执行？？？**
   **如果resolve中传入的是一个thenable对象的话，是怎样的情况**

## Promise.prototype.then()
> 为Promise实例状态发生改变时添加回调函数

##### Promise.prototype.then()总是返回一个新的Promise实例
**如果只是单纯的.then()，不传任何的回调函数，还是会返回一个新的Promise实例吗（终重点在新上面）？？？如果返回的话，状态是怎样的？？？**
由于then()方法总是会返回一个新的Promise实例，所以可以进行链式调用

## Promise.prototype.catch()
> Promise.prototype.catch() 方法是Promise.prototype.then(null, rejection)的别名

**Promise.resolve().then().then(() => {console.log(1)}) Promise.resolve().then(()=> {console.log(2)})，2会比1先打印吗？？？**

Promise.prototype.catch()也会返回一个新的Promise实例 
一般来说，不要在Promise.prototype.then()中定义rejected状态的回调，让catch去捕获它

整个Promise的Error（注意是Promise执行阶段）虽然会终止内部部分代码的执行，但是不会将Error传递给外层，让外层的代码终止执行

## Promise.prototype.finally();
> 无论前面是fulfilled还是rejected状态，都会进入到Promise.prototype.finally
> Promise.prototype.finally()方法应该用来做收尾工作

*注意，finally的回调不接受任何的参数，所以也不知道是前面的Promise实例是怎样的状态* 






