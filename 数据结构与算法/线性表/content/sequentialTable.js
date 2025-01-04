/**
 * 线性表的顺序表实现
 * 顺序表：一片连续的地址存储数据，知道首元素的地址，其他位置的地址可以推算出来
 * 这里用数组来模拟实现（js中数组元素的地址并不一定是连续的）
 */

class ST {
  #MaxLength = 1000;
  list = {};

  #initError () {
    if (!this.list.elems) {
      throw new Error('请先初始化表');
    };
  };
  #emptyError () {
    if (this.listIsEmpty()) {
      throw new Error('当前表为空表');
    };
  };

  // 初始化，创建一个空的线性表
  initList () {
    if (this.list?.elems) {
      throw new Error('请勿重复初始化');
    };
    this.list = {
      elems: new Array(this.#MaxLength),
      length: 0,
    };
  };
  listAppend (elemValue) {
    this.#initError();
    const listLength = this.listLength();
    if (listLength >= this.#MaxLength) {
      throw new Error('表已满，无法再继续添加元素');
    };
    this.list.elems[listLength] = elemValue;
    this.list.length++;
  };
  // 销毁表
  destoryList () {
    if (this.list.elems) {
      this.list = {};
    }
  };
  // 清空表
  clearList () {
    this.#initError();
    if (this.listIsEmpty()) {
      return;
    };
    this.list.elems = [];
    this.list.elems.length = this.#MaxLength; // 将每一项设置为empty
    this.list.length = 0;
  };
  // 判断表是否为空
  listIsEmpty () {
    this.#initError();
    return !this.listLength();
  };
  // 获取表的长度
  listLength () {
    this.#initError();
    return this.list.length;
  };
  // 获取对应下表元素的值
  getElem (index) {
    this.#initError();
    if (index >= this.listLength()) {
      return;
    };
    return this.list.elems[index];
  };
  // 获取当前元素的index
  locateElem (elemValue) {
    this.#initError();
    return this.list.elems.findIndex(e => e === elemValue);
  };
  // 获取当前元素的前驱
  priorElem (elemValue) {
    this.#initError();
    this.#emptyError();
    const index = this.locateElem(elemValue);
    if (index === 0) {
      throw new Error('当前元素处于表中第一个没有前驱');
    };
    if (index === -1) {
      throw new Error('当前元素未在表中查找到');
    };
    return this.list.elems[index - 1];
  };
  // 获取当前元素的后继
  nextElem (elemValue) {
    this.#initError();
    this.#emptyError();
    const index = this.locateElem(elemValue);
    if (index === this.listLength() - 1) {
      throw new Error('当前元素处于表中最后一个没有后继');
    };
    if (index === -1) {
      throw new Error('当前元素未在表中查找到');
    };
    return this.list.elems[index + 1];
  };
  // 在表对应位置塞入一个元素
  listInsert (index, elemValue) {
    this.#initError();
    const listLength = this.listLength();
    if (listLength >= this.#MaxLength) {
      throw new Error('表已满，无法再继续添加元素');
    };
    if (index < 0 || index > listLength) {
      throw new Error(`当前表长${listLength}，只能在 [0, ${listLength}] 之间插入元素`);
    };
    for (let i = listLength - 1; i >= index; i--) {
      this.list.elems[i + 1] = this.list.elems[i];
    };
    this.list.elems[index] = elemValue;
    this.list.length++;
  };
  // 删除表中对应的位置的元素
  listDelete (index) {
    this.#initError();
    const listLength = this.listLength();
    if (index < 0 || index > listLength - 1) {
      throw new Error(`当前表长${listLength}，只能在 [0, ${listLength - 1}] 之间删除元素`);
    };
    for (let i = index; i < listLength; i++) {
      this.list.elems[i] = this.list.elems[i + 1];
    };
    this.list.elems.length = this.list.length - 1;
    this.list.elems.length = this.#MaxLength; // 这两步是为了将其他项设置为empty
    this.list.length--;
  };
  // 遍历表
  traverseList () {
    this.#initError();
    let index = 0;
    let data = 'list';
    while (index < this.listLength()) {
      data = `${data} -> ${this.list.elems[index]}`;
      index++;
    };
    return data;
  };
};

const st1 = new ST();
st1.initList();
console.log(st1.listIsEmpty());
console.log(st1.listLength());
st1.listAppend(12);
console.log(st1.listLength());
console.log(st1.traverseList());
st1.listAppend(12);
st1.listAppend(11);
console.log(st1.traverseList());
console.log(st1.listIsEmpty());
st1.listDelete(1);
console.log(st1.traverseList());
st1.listInsert(2, 2);
console.log(st1.traverseList());
st1.listInsert(2, 2);
console.log(st1.traverseList());
st1.listInsert(2, 2);
console.log(st1.traverseList());
console.log(st1.priorElem(2));
st1.listDelete(st1.listLength() - 1);
console.log(st1.traverseList());
st1.listDelete(st1.listLength() - 1);
console.log(st1.traverseList());
st1.listDelete(st1.listLength() - 1);
console.log(st1.traverseList());
// console.log(st1.priorElem(2));
console.log(st1.priorElem(11));
// console.log(st1.priorElem(12));
console.log(st1.nextElem(12));





