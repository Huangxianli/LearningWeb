'use strict';

/**
 * Promise then的回调函数会在当前脚本的所有同步任务都执行之后才执行
 */
function test1 () {
  const callback = function () {
    console.log('---test1------------------------------------------');

    const test1_1 = function () {
      Promise.resolve().then(
        res => {
          console.log('1');
        }
      );
    };
    console.log('2')
    const test1_2 = function () {
      console.log('3');
    };
    test1_1();
    test1_2();
    // 这里打印的顺序是 2 3 1，注意，3也是在1的前面打印的
  };
  setTimeout(callback);
};
test1();

/**
 * @question catch的回到是否也和then的回调一样，是在当前脚本的所有同步任务执行完了之后才执行？？？
 * @answer 和then的一样
 */
function test2 () {
  const callback = function () {
    console.log('---test2------------------------------------------');

    const test2_1 = function () {
      Promise.reject().catch(() => {
        console.log('1')
      })
    };
    console.log('2');
    const test2_2 = function () {
      console.log('3');
    };
    test2_1();
    test2_2();
    // 注意这里打印的也是 2 3 1；说明和then一样，catch中的回调函数会在所有同步任务执行之后再执行
  };
  setTimeout(callback);
};
test2();

/**
 * @question resolve()的参数可以传递一个Promise实例，那么reject可以传递一个Promise实例吗？？？
 * @answer  可以
 * 
 */
function test3 () {
  const callback = function () {
    console.log('---test3------------------------------------------');

    const test3_1 = function () {
      Promise.resolve(Promise.reject()).then(() => {
        console.log('test3_1_then_resovle');
      }).catch(() => {
        console.log('test3_1_catch')
      });
    };
    test3_1();

    const test3_2 = function () {
      Promise.reject(Promise.resolve()).then(() => {
        console.log('test3_2_then_resolve');
      }).catch(() => {
        console.log('test3_2_catch');
      })
    };
    test3_2();

  };
  setTimeout(callback);
};
test3();

/**
 * resolve()的参数如果是一个Promise实例，会等待该实例的状态落定后再决定进入哪个回调
 * @question reject()的参数如果是一个Promise实例，会等待该实例的状态落定了才决定进入哪个回调吗？？？传递给后面回调的参数值和resolve()的一样进行类似解构的操作吗？？？
 * @answer reject()若传递的是一个Promise实例，不会等待该实例的状态落定才决定进入哪个回调；同时回调接受到的参数就是传入的Promise实例，不会像resolve()传入的Promise实例那样进行类似解构的操作
 */
function test4 () {
  const callback = function () {
    console.log('---test4------------------------------------------');

    // resolve()中如果是一个Promise实例，会等待其状态落定了后才决定进入哪个回调
    const test4_1 = function () {
      const promise4_1 = new Promise(resolve => {
        setTimeout(() => {
          resolve('promise4_1');
        }, 4000);
      });
      new Promise(resolve => {
        resolve(promise4_1)
      }).then(res => {
        console.log(promise4_1); // Promise {<fulfilled>: 'promise4_1'} 注意这里的promise4_1已经是fulfilled状态，promise4_1的状态已经改变了后才进入到现在这个回调
        console.log('test4_1-promise-then-res：', res); // test4_1-promise-then-res： promise4_1 注意这里得到的值不是一个promise
      });
    };
    test4_1();

    // reject()中如果是一个Promise实例，不会等待传入的Promise实例的状态落定，确定进入的是rejected状态对应的回调，同时，会直接将该Promise实例作为参数获取到
    const test4_2 = function () {
      const promise4_2 = new Promise(resolve => {
        setTimeout(() => {
          resolve('promise4_2');
        }, 4000);
      })
      new Promise((resolve, reject) => {
        reject(promise4_2);
      }).catch(err => {
        console.log(promise4_2); // Promise {<pending>} 注意这里还是pending状态，相当reject()中如果是一个Promise实例的话，不会等待其状态落定后才决定进入哪里的回调，而是直接进入对应rejected的回调
        console.log('test4_2-promise-catch-err：', err); // test4_2-promise-catch-err： Promise {<pending>} 注意这里的值是一个Promise实例（若reject()中传递的是Promise实例，这里也会是Promise实例）
      });
    };
    test4_2();
    /**
      * 注意整体的答应顺序是这样的，也说明了reject不许要其传入的Promise实例的转态落定就能进入到reject对应的回调中
      * Promise {<pending>}
      * test4_2-promise-catch-err： Promise {<pending>}
      * Promise {<fulfilled>: 'promise4_1'}
      * test4_1-promise-then-res promise4_1
      */
  };
  setTimeout(callback);
};
test4();

/**
 * reslove()和reject()都不会终止Promise的参数函数的执行
 * @question 如果resolve()和reject()中传入的是一个函数的调用，什么时候执行该函数
 * @answer resolve()/reject()的前一行代码执行之后，就会立即执行后面resolve()/reject()中传入的参数调用，并不是说改变Promise状态的前一刻执行
 * @question 如果resolve()中传入一个thenable是什么情况
 * @answer 会在同步代码执行之后，调用thenable对象中的then方法
 * @question 如果reject()中传入的是thenable对象是什么情况
 * @answer 和resolve的情况不同，不会执行thenable对象中的then方法
 */
function test5 () {
  const callback = function () {
    console.log('---test5------------------------------------------');

    // resolve()和 reject()都不会终止Promise参数回调的执行
    const test5_1 = function () {
      new Promise(resolve => {
        console.log('test5_1-1');
        resolve('test5_1-2');
        console.log('test5_1-3');
      });
      console.log('test5_1-4');
      // test5_1-1 test5_1-3 test5_1-4
    };
    test5_1();
    const test5_2 = function () {
      new Promise((resolve, reject) => {
        console.log('test5_2-1');
        reject('test5_2-2');
        console.log('test5_2-3');
      });
      console.log('test5_2-4');
      // test5_2-1 test5_2-3 test5_2-4
    };
    test5_2();

    // resolve()和reject()中如果传入的是一个函数的调用，注意，函数是会立即开始执行的，由下面的打印可以看出
    const test5_3 = function () {
      new Promise(resolve => {
        const test5_3_1 = function () {
          console.log('test5_3-1');
        };
        resolve(test5_3_1());
        console.log('test5_3-2');
      });
      console.log('test5_3-3');
      // test5_3-1 test5_3-2 test5_3-3 注意这里的答应顺序
    };
    test5_3();
    const test5_4 = function () {
      const test5_4_1 = function () {
        console.log('test5_4-1')
      };
      new Promise((resolve, reject) => {
        reject(test5_4_1());
        console.log('test5_4_2');
      });
      console.log('test5_4_3');
      // test5_4-1 test5_4_2 test5_4_3
    };
    test5_4();

    // 如果resolve传入的是一个thenable()对象，会在同步代码执行完之后调用对象中的then方法
    const test5_5 = function () {
      const thenable5_5_1 = {
        then (resolve, reject) {
          resolve('thenable5_5_1');
          console.log('thenable5_5_1')
        },
      };
      new Promise(resolve => {
        resolve(thenable5_5_1);
        console.log('test5_5_2');
      });
      console.log('test5_5_3');
      // test5_5_2 test5_5_3 thenable5_5_1
    };
    test5_5();

    // 如果reject()中传入的是thenable对象，不会执行其中的then方法
    const test5_6 = function () {
      const thenable5_6_1 = {
        then (resolve) {
          resolve('thenable5_6_1');
          console.log('thenable5_6_1');
        },
      };
      new Promise((resolve, reject) => {
        reject(thenable5_6_1);
        console.log('test5_6_2');
      });
      console.log('test5_6_3');
      // test5_6_2 test5_6_3
    };
    test5_6();
  };
  setTimeout(callback);
};
test5();


function test6 () {
  let a1 = new Promise(res => { res() }).then(() => { console.log('1') }).then(() => { console.log('2') });
  new Promise(res => { res(a1) }).then(() => { console.log(3) }).then(() => console.log(4));
  // 1 2 3 4
  let a2 = new Promise(res => { setTimeout(() => { res() }) }).then(() => { console.log('1') }).then(() => { console.log('2') });
  new Promise(res => { res(a2) }).then(() => { console.log(3) }).then(() => console.log(4));
  // 1 2 3 4

  new Promise(res => { res() }).then(() => { console.log(1) }).then(() => { console.log(2) }).then(() => { console.log(3) });
  new Promise(res => { res() }).then(() => { console.log(4) }).then(() => { console.log(5) }).then(() => { console.log(6) });
  // 1 4 2 5 3 6

  let p = new Promise((resolve, reject) => {
    resolve(new Promise(res => { setTimeout(res, 1000) }).then().then().then());
    reject();
  });
  setTimeout(console.log, 1000, p);
  let p1 = Promise.resolve({ then (res, rej) { rej() } });
  let p2 = Promise.resolve({ then (res, rej) { res({ then (res, rej) { rej() } }) } });

  let p3 = Promise.resolve();
  let p4 = Promise.resolve().then(() => {
    console.log(1);
    return p3
  });
  setTimeout(() => { console.log(p3 === p4) }, 1000);
  let p5 = Promise.resolve();
  let p6 = new Promise(resolve => { resolve(p5) });
  setTimeout(() => { console.log(p5 === p6) });

  let p7 = Promise.resolve().then(() => new Promise((resolve, reject) => { setTimeout(() => { reject() }, 4000); }));
  setTimeout(() => { console.log(p7) });

  let p8 = new Promise(resolve => { resolve(Promise.resolve()) }).then(() => { console.log(1) });
  let p9 = new Promise(resolve => { resolve() }).then(console.log(2));

  let p10 = new Promise(resolve => { resolve(new Promise(res => { res() })) }).then(() => { console.log(1) });
  let p11 = new Promise(resolve => { resolve(); debugger; console.log(p10) }).then(() => { console.log(2) });
  let p12 = new Promise(resolve => { resolve(); console.log(p11) }).then(() => { console.log(3) }).then(() => { console.log(4) }).then(() => { console.log(5) });
  // 2 3 4 1 5
  let p13 = new Promise(resolve => { resolve() });
  console.log(p13);
  let p14 = new Promise(resolve => { resolve() }).then();
  console.log(p14);
};