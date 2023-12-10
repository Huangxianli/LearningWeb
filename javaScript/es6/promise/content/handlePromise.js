const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
/* 
1、确定基本的结构，promise是使用new调用的，有3种状态，调用的时候，入参是一个回调函数，该回调函数有两个参数
promise对象有一个then方法可以调用
 */

/* 
function MyPromise (fn) {
  let _this = this;
  this.status = PENDING; // 状态
  this.value = null; // 成功的结果
  this.reason = null; // 失败的原因
  function resolve (value) { }
  function reject (reason) { }
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// promise实例必须要有一个then方法可以执行，两个回调函数
MyPromise.prototype.then = function (onFulfilled, onRejected) {
}
 */

/*
2、状态改变之后是不能变的，只能在pending状态下改成 fulfilled 或者 rejected，而且是在执行resolve() 或者rejecte()后才改变
 */
/* 
function MyPromise (fn) {
  let _this = this;
  this.status = PENDING; // 状态
  this.value = null; // 成功的结果
  this.reason = null; // 失败的原因
  function resolve (value) {
    if (_this.status === PENDING) {
      _this.status = FULFILLED;
      _this.value = value;
    }
  }
  function reject (reason) {
    if (_this.status === PENDING) {
      _this.status = REJECTED;
      _this.reason = reason;
    }
  }
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
}
 */

/*
3、then 的实现，无论是成功还是失败后，都会触发then函数；
在then的参数是两个回调函数，一个是成功后的回调函数，一个是失败后的回调函数
 */
/* 
function MyPromise (fn) {
  let _this = this;
  this.status = PENDING; // 状态
  this.value = null; // 成功的结果
  this.reason = null; // 失败的原因
  function resolve (value) {
    if (_this.status === PENDING) {
      _this.status = FULFILLED;
      _this.value = value;
    }
  }
  function reject (reason) {
    if (_this.status === PENDING) {
      _this.status = REJECTED;
      _this.reason = reason;
    }
  }
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  if (this.status === FULFILLED && typeof onFulfilled === "funciton") {
    onFulfilled(this.value);
  }
  if (this.status === REJECTED && typeof onRejected === "function") {
    onRejected(this.reason);
  }
}

let myPromise_1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  }, 100);
})

myPromise_1.then(
  // 这里调用then函数的时候，异步还没有执行完，即内部的状态还没有发生改变，所以两个回调都不会进入
  value => {
    debugger
  },
  reason => {
    debugger
  })
   */

/*
4、支持异步 
进入then的两个内部的回调函数，应该是在状态发生改变之后，也就是执行了resolve()，后者是reject()之后，我们可以把then的回调函数放到resolve或者reject中的最后一步来执行
onFulfilled和onRejected为什么设置数组而不设置一个普通的变量，是因为：一个promise的对象可以then多次 p.then(value1= {}) p.then(value2=> {})
如果不使用数组来接收的话，第一个then的回调函数的内容会被第二个then的回调函数的内容覆盖掉
 */
/* 
function MyPromise (fn) {
  let _this = this;
  this.status = PENDING; // 状态
  this.value = null; // 成功的结果
  this.reason = null; // 失败的原因
  this.onFulfilled = []; // 装then中成功的回调
  this.onRejected = []; // 装then中失败的回调
  function resolve (value) {
    if (_this.status === PENDING) {
      _this.status = FULFILLED;
      _this.value = value;
      _this.onFulfilled.forEach(onFulfilled => onFulfilled(value))
    }
  }
  function reject (reason) {
    if (_this.status === PENDING) {
      _this.status = REJECTED;
      _this.reason = reason;
      _this.onRejected.forEach(onRejected => onRejected(reason))
    }
  }
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  if (this.status === FULFILLED && typeof onFulfilled === "funciton") {
    onFulfilled(this.value);
  }
  if (this.status === REJECTED && typeof onRejected === "function") {
    onRejected(this.reason);
  }
  if (this.status === PENDING) {
    // 如果调用then的时候，还是pending状态的时候，将onFulfilled和onRejected收集起来
    if (typeof onFulfilled === "function") {
      this.onFulfilled.push(onFulfilled)
    }
    if (typeof onRejected === "function") {
      this.onRejected.push(onRejected)
    }
  }
}
 */

/*
5、实现链式调用
then方法必须返回一个promise对象
 */

function MyPromise (fn) {
  let _this = this;
  this.status = PENDING; // 状态
  this.value = null; // 成功的结果
  this.reason = null; // 失败的原因
  this.onFulfilled = []; // 装then中成功的回调
  this.onRejected = []; // 装then中失败的回调
  function resolve (value) {
    if (_this.status === PENDING) {
      _this.status = FULFILLED;
      _this.value = value;
      _this.onFulfilled.forEach(onFulfilled => onFulfilled(value))
    }
  }
  function reject (reason) {
    if (_this.status === PENDING) {
      _this.status = REJECTED;
      _this.reason = reason;
      _this.onRejected.forEach(onRejected => onRejected(reason))
    }
  }
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  let promise = new MyPromise((resolve, reject) => {

  })
  if (this.status === FULFILLED && typeof onFulfilled === "funciton") {
    onFulfilled(this.value);
  }
  if (this.status === REJECTED && typeof onRejected === "function") {
    onRejected(this.reason);
  }
  if (this.status === PENDING) {
    // 如果调用then的时候，还是pending状态的时候，将onFulfilled和onRejected收集起来
    if (typeof onFulfilled === "function") {
      this.onFulfilled.push(onFulfilled);
    }
    if (typeof onRejected === "function") {
      this.onRejected.push(onRejected);
    }
  }
  return promise;
}