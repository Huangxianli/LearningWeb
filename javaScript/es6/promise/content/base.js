'use strict'

/*
 基本用法
 Promise.protoype.then()
 Promise.protoype.catch()
 Promise.protoype.finally()
 Promise.all()
 Promise.race()
 Promise.allSettled()
 Promise.any()
 Promise.resolve()
 Promise.reject()
 */

/*
Promise 的特点：
1、Promise 对象的状态不受外部的影响。
  pending、fulfilled、rejected。只有异步执行的结果可以决定当前是出于什么状态，其他的任何操作都无法改变这个状态。这也是 Promise 名字的来源。
2、一旦对象的状态发生了改变，就不会再变了。只能从 pending 到 fulfilled 或者 rejected。

缺点：
1、无法取消 Promise，一旦建立就会立即执行，无法中途取消
2、如果不设置回调函数，Promise 内部的错误，不会返回发到外部
3、当处于 pendinig 状态的时候，无法知道是刚开始还是即将完成
 */

function setPromiseResult (successCall, failCall, asyncDoing = () => ({ isSuccess: true }), time = 0) {
  setTimeout(() => {
    const { isSuccess, value } = asyncDoing();
    if (isSuccess) {
      successCall(value);
    } else {
      failCall(value);
    }
  }, time)
}

function createPromise (asyncDoing, time = 0) {
  const promise = new Promise((resolve, reject) => {
    // console.log("这里内容在编译到这里的时候会立即执行");
    // 记住： new Promise(() => { }) 里的回调函数的内容在 new 的时候就会执行，除非是代码本身就是异步的
    const successDoing = function (value) {
      resolve(value);
    };
    const failDoing = function (error) {
      reject(error);
    }
    setPromiseResult(successDoing, failDoing, asyncDoing, time); // 立马执行
  })
  return promise;
}

/* 
const newPrmise = createPromise();
newPrmise.then(() => {
  debugger
  // createPrmise() resolve的回调
}, () => {
  debugger
  // createPrmise() reject的回调
}); 
*/

/* 
function asyncDoing_1 () {
  return {
    isSuccess: false,
    value: "阿欧，出现错误了"
  };
}
const newPromise_1 = createPromise(asyncDoing_1);
newPromise_1.then((value) => {

}).catch((error) => {
  // 捕获creatPomise方法中抛出的错误；
  debugger
})

 */
function asyncDoing_2_1 () {
  return {
    isSuccess: true,
    value: "第一次进入成功的回调"
  }
}
function asyncDoing_2_2 () {
  return {
    isSuccess: true,
    value: "第二次进入成功的回调"
  }
}
function asyncDoing_2_3 () {
  return {
    isSuccess: false,
    value: "失败了"
  }
}

/*
const newPromise_2_1 = createPromise(asyncDoing_2_1);

newPromise_2_1.then((value) => {
  debugger
  return createPromise(asyncDoing_2_2)
}).then((value) => {
  debugger
})
*/

/*
const newPromise_2_2 = createPromise(asyncDoing_2_3);

newPromise_2_2.then(value => {
  debugger
  return createPromise(asyncDoing_2_2)
}).then(value => {
  debugger
  return createPromise(asyncDoing_2_2)
}).catch(value => {
  debugger // catch的内部会自己返回一个promise，即使catch里面没有手动的return同一个promise依然可以接.catch
}).then(value => {
  debugger
})
 */

/*
const newPromise_2_3 = createPromise(asyncDoing_2_3);

newPromise_2_3.then(value => {
  debugger
}, value => {
  debugger
  // 这个回调函数的优先级高于catch，但其实一般来说，我们使用catch
})
  .catch(error => {
    debugger
  })
*/

/*
const newPromise_2_3 = createPromise(asyncDoing_2_3);
newPromise_2_3.catch(error => {
  // 可以直接使用catch
  debugger
})
 */

// 如果没有使用catch 指定错误处理的回调函数，Promise对象抛出的错误不会传递到外层代码，不会有任何反应
/*
const newPromise_3 = new Promise(resolve => {
  resolve(x + 3)
})

newPromise_3.then(res => { });

setTimeout(() => {
  console.log("能够继续执行下面的内容");
}, 100)
 */

// finally() 不管promise对象最后状态如何们都会执行
/*
const newPromise_4 = new Promise(resolve => {
  resolve(x + 1)
})
newPromise_4.then()
  .finally(() => { // 依然会进入这个finally
    debugger
  })

// finally() 返回的是原来的值
Promise.resolve(2).then(() => { }); // undefined
Promise.resolve(2).finally(() => { }); // 2
Promise.reject(3).finally(() => { }); //3
 */

/*
function asyncDoing_5_1 () {
  return {
    isSuccess: true,
    value: 1
  }
}
function asyncDoing_5_2 () {
  return {
    isSuccess: true,
    value: 2
  }
}
function asyncDoing_5_3 () {
  return {
    isSuceess: false,
    value: 3
  }
}
const promise_5_1 = createPromise(asyncDoing_5_1, 300);
const promise_5_2 = createPromise(asyncDoing_5_2, 200);
const promise_5_3 = createPromise(asyncDoing_5_3, 100);

Promise.all([promise_5_1, promise_5_2, promise_5_3]) // 所有成功才会进入成功的回调，只要有一个失败，就会进入失败的回调
  .then(values => {
    debugger
  })
  .catch(errors => { // 这里只返回第一个被rejected的值
    debugger
  })

Promise.race([promise_5_1, promise_5_2, promise_5_3]) // 取最先完成的一个状态进入回调函数
  .then(value => {
    debugger
  })
  .catch(error => { // 会进入catch，因为最早的promise的状态是rejected
    debugger
  })

Promise.allSettled([promise_5_1, promise_5_2, promise_5_3]) // 成功失败都会进入then，即使都rejected了
  .then(values => { debugger })
  .catch(error => { debugger })
// 返回结果
// [
//   { status: "fulfilled", value: 1 },
//   { status: "fulfilled", value: 2 },
//   { status: "rejected", reason: 3 }
// ]

Promise.any([promise_5_1, promise_5_2, promise_5_3]) // any，代表的是任何一个成功就进入then，只有全部都rejected的才会进入then
  .then(value => {
    debugger
  })
  .catch(error => {
    debugger
  })
 */

// Promise.resolve("foo") 等价于 new Promise(resolve => resolve("foo"))；
// 这种写法，Promise.resolve() 是在本轮事件循环结束时执行的，而不是在下一轮事件循环开始时执行
/*
// 1、参数是一个promise实例的时候原封不懂的返回该实例
const promise_6_1 = new Promise(resolve => resolve());
const promise_6_2 = Promise.resolve(promise_6_1);
console.log(promise_6_1 === promise_6_2) // true

// 2、参是一个thenable对象，Promise.resolve()会将这个对象转化为promise对象，然后马上执行.then()
const thenAble = {
  then: (resolve) => { resolve(1) }
}
const promise_6_3 = Promise.resolve(thenAble);
promise_6_3.then(value => {
  debugger // 1
})

// 3、参数不是具有then方法的对象，或者根本就不是对象，会生成一个新的 promise对象，状态为resolved，回调函数对应的参数的值为传入Promise.resolve()中的参数
const notThenAble = {};
const promise_6_4 = Promise.resolve(notThenAble);
promise_6_4.then(resolve => { // 这里的resolve的值为{}
  debugger
})

// 不带有任何参数直接返回一个resolved状态的promise对象
const promise_6_5 = Promise.resolve();
promise_6_4.then(resolve => {
  debugger
})
 */

// Promise.reject()
