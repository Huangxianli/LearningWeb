/*
垃圾回收是周期性的

标记清理：进入上下文的时候，标记进入，离开上下文的时候也标记离开；去除在上下文中的，以及被在上下文中的变量引用的变量的标记去掉，其他被标记的变量就可以被回收掉
引用计数：对每一个值都记录他被引用的次数。例如赋值+1，保存对该值引用的的变量被其他值覆盖了-1；触发回收机制的时候，为0的回收掉
 */

// 引用计数存在问题，
function a1 () {
  let a = {};
  let b = {};
  a.name = b;
  b.name = a;
  console.log(a); // {name: { name: { name: { ... } } } }
}

a1()

