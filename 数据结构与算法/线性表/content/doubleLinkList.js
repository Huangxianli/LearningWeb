/**
 * 线性表的双链表实现
 * 要注意在，双链表造成了循环引用
 */
class DoubleLinkList {
  #list = {};
  #initError () {
    if (!Object.keys(this.#list).includes('head')) {
      throw new Error('请先初始化单链表');
    }
  };

  initList () {
    this.#list = {
      head: null,
      tail: null,
      size: 0,
    };
  };

  #createNode (data) {
    return {
      prior: null,
      data,
      next: null,
    };
  };
  listHeadAppend (data) {
    this.#initError();
    const newNode = this.#createNode(data);
    if (this.listIsEmpty()) {
      this.#list.tail = newNode;
    } else {
      this.#list.head.prior = newNode;
    }
    newNode.next = this.#list.head;
    this.#list.head = newNode;
    this.#list.size += 1;
  };
  listTailAppend (data) {
    this.#initError();
    const newNode = this.#createNode(data);
    if (this.listIsEmpty()) {
      this.#list.head = newNode;
      this.#list.tail = newNode;
    } else {
      this.#list.tail.next = newNode;
      newNode.prior = this.#list.tail;
      this.#list.tail = newNode
    }
    this.#list.size++;
  };
  destoryList () {
    this.#list = {};
  };
  clearList () {
    const size = this.listSize();
    for (let i = 0; i < size; i++) {
      this.#list.head.prior = null;
      let current = this.#list.head;
      this.#list.head = this.#list.head.next;
      current.next = null;
      current = null;
      this.#list.size--;
    }
    this.#list.tail = null;
  };
  listSize () {
    return this.#list.size
  };
  listIsEmpty () {
    this.#initError();
    return this.listSize() === 0;
  };
  getElemByIndex (index) {
    this.#initError();
    const size = this.listSize();
    if (size === 0) {
      throw new Error('当前双链表是空链表');
    }
    if (index >= size) {
      throw new Error(`当前双链表的长度为${size}，查找范围为[0, ${size - 1})，当前超过了该范围`);
    }
    let target = this.#list.head;
    for (let i = 0; i < index; i++) {
      target = target.next;
    }
    return target.data;
  };
  // 查找元素对应的index
  locateElem (data) {
    this.#initError();
    if (this.listSize() === 0) {
      throw new Error('当前双链表是空链表');
    }
    let target = this.#list.head;
    let findIndex = false;
    let index = -1;
    while (!findIndex && target) {
      findIndex = target.data === data;
      target = target.next;
      index++;
    };
    if (findIndex) {
      return index;
    }
    throw new Error(`当前双链表中没有找到元素${data}`);
  };
  priorElemByElem (data) {
    this.#initError();
    if (this.listSize() === 0) {
      throw new Error('当前双链表是空链表');
    }
    // 继续完成

  };

  nextElemByElem () { };
  listInsertByIndex () { };
  listDeleteByIndex () { };
  traverseList () { };
};

const list = new DoubleLinkList();
list.initList();
list.listHeadAppend(1);
list.listHeadAppend(2);
// list.listHeadAppend(3);
// list.listTailAppend(4);
// list.listTailAppend(5);
// list.listTailAppend(6);
// const data1 = list.getElemByIndex(3);
// console.log(data1);
const index1 = list.locateElem(2);
console.log(index1);
console.log(list);