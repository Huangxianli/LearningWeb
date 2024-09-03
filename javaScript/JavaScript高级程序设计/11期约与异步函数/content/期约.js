/**
 * 期约的出现是为了解决异步只能用回调函数的问题
 */
function test1 () {
  console.log('---test1----------------------------------------------------------');
  const callback = function (data) {
    console.log(data);
  };
  const callback1 = function (data1, callback) {
    setTimeout(() => {
      const getDate = 'info1';
      callback(getDate);
    });
  };
  setTimeout(() => {
    const data = 'info';
    callback1(
      data,
      callback // callback依赖callback1的异步返回结果，callback1依赖最外层的异步操作返回结果
    );
  });
};

test1();

/**
 * 期约的执行器函数
 * 期约的状态转化成fulfilled（已兑现）或者rejected（已拒绝）之后就不能再转化
 */
function test2 () {
  console.log('---test2----------------------------------------------------------');
  const p1 = new Promise((resolve, reject) => {
    resolve(1);
    reject(2);
  });
  console.log(p1); // Promise {<fulfilled>: 1} 后面的reject(2)没有效果

  // 如果传的是期约对象呢？
  const p2 = new Promise((resolve, reject) => {
    resolve(new Promise((resolve, reject) => resolve()).then());
    reject(new Promise((resolve, reject) => reject()));
  });
  console.log(p2); // Promise {<pending>}
  p2.then(() => {
    console.log('onResolved');
  }).catch(() => {
    console.log('catch');
  });
  // onResolved
};

test2();
