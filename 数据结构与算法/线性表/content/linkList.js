/**
 * 线性表的单链表实现
 */
class LinkList {
  list = {};
  #initError () {
    if (this.list.head !== null && !this.list.head) {
      throw new Error('请先初始化单链表');
    }
  };

  #createNode (data) {
    return {
      data,
      next: null,
    };
  };

  initList () {
    this.list = {
      head: null,
      tail: null,
      size: 0,
    };
  };
  listHeadAppend (data) {
    this.#initError();
    const node = this.#createNode(data);
    if (this.listSize()) {
      node.next = this.list.head;
      this.list.head = node;
    } else {
      this.list.head = node;
      this.list.tail = node;
    };
    this.list.size++;
  };
  listTailAppend (data) {
    this.#initError();
    const node = this.#createNode(data);
    if (this.listSize()) {
      this.list.tail.next = node;
      this.list.tail = node;
    } else {
      this.list.head = node;
      this.list.tail = node;
    };
    this.list.size++;
  }
  destoryList () {
    this.#initError();
    this.list = {};
  };
  clearList () {
    this.#initError();
    this.list.head = null;
    this.list.tail = null;
    this.list.size = 0;
  };
  listIsEmpty () {
    this.#initError();
    return !this.listSize();
  };
  listSize () {
    this.#initError();
    return this.list.size;
  };
  getElem (index) {
    this.#initError();
    const listSize = this.listSize();
    if (this.listSize() <= index) {
      throw new Error(`当前链表的长度为${listSize}，只能查找位置为 [0, ${listSize}] 之间的元素`);
    };
    let data = null;
    let indexTemp = index;
    let L = this.list.head;
    while (indexTemp >= 0) {
      data = L.data;
      indexTemp--;
      L = L.next;
    };
    return data;
  };
  locateElem (data) {
    this.#initError();
    let index = -1;
    let L = this.list.head;
    for (let i = 0; L; i++) {
      if (L.data === data) {
        index = i;
      };
      L = L.next;
    };
    return index;
  };
  priorElem (elemValue) {
    this.#initError();
    if (this.listSize() === 0) {
      throw new Error('当前链表为空链表');
    };
    let resultInfo = {
      isFind: false,
      data: null,
    };
    let L = this.list.head;
    if (L.data === elemValue) {
      throw new Error('该元素为链表第一个元素，无前驱元素');
    };
    while (L.next && !resultInfo.isFind) {
      if (L.next.data === elemValue) {
        resultInfo.isFind = true;
        resultInfo.data = L.data;
      };
    };
    if (!resultInfo.isFind) {
      throw new Error('该元素未在链表中查找到');
    };
    return resultInfo.data;
  };
  nextElem (elemValue) {
    this.#initError();
    if (this.listSize() === 0) {
      throw new Error('当前链表为空链表');
    };
    let findCurrent = false;
    let L = this.list.head;
    while (L.next && !findCurrent) {
      if (L.data === elemValue) {
        findCurrent = true;
      };
    };
    if (!findCurrent) {
      throw new Error('该元素为在链表中找到');
    };
    if (!L.next) {
      throw new Error('该元素在链表最后一位，无后继元素');
    };
    return L.next.data;
  };
  listInsert (index, elemValue) {
    this.#initError();
    const listSize = this.listSize();
    if (index < 0 || index > listSize) {
      throw new Error(`当前链表长度为${listSize}，只能在 [0, ${listSize}] 之间插入元素`);
    };
    let L = this.list.head;
    const node = this.#createNode(elemValue);
    let indexTemp = index;
    while (indexTemp > 0) {
      L = L.next;
      indexTemp--;
    };
    if (index === 0) {
      node.next = this.list.head;
      this.list.head = node;
    };
    if (index === listSize) {
      if (this.list.tail) {
        this.list.tail.next = node;
      };
      this.list.tail = node;
    };
    if (index < listSize && index > 0) {
      node.next = L.next;
      L.next = node;
    };
    this.list.size++;
  };
  listDelete (index) {
    this.#initError();
    if (this.listSize() === 0) {
      throw new Error('当前链表为空链表');
    };
    const listSize = this.listSize();
    if (index < 0 || index > listSize - 1) {
      throw new Error(`当前链表长度为${listSize}，只能在 [0, ${listSize - 1}] 之间删除元素`);
    };
    let indexTemp = index - 1;
    let L = this.list.head;
    while (indexTemp > 0) {
      L = L.next;
      indexTemp--;
    };
    if (index === 0) {
      this.list.head = this.list.head.next;
    };
    if (index === listSize - 1) {
      L.next = null; // 假如是只有一项，删除0，那么这个L其实被删除了，
      this.list.tail = L;
    };
    if (listSize === 1) {
      this.list.tail = null;
    };
    if (index > 0 && index < listSize - 1) {
      node.next = L.next;
      L.next = node;
    }
    this.list.size--;
  };
  traverseList () {
    this.#initError();
    let L = this.list.head;
    let data = 'list';
    while (L) {
      data = `${data} -> ${L.data}`;
      L = L.next;
    };
    return data;
  };
};

const list = new LinkList();
list.initList();
console.log(list.traverseList());
list.listInsert(0, 0);
console.log(list.traverseList());
// list.listInsert(2, 2);
list.listInsert(1, 1);
console.log(list.traverseList());
list.listDelete(1);
console.log(list.traverseList());
// list.listDelete(1);
list.listDelete(0);
console.log(list.traverseList());
list.listInsert(0, 0);
console.log(list.traverseList());
console.log(list.locateElem(0));
list.listInsert(1, 1);
console.log(list.locateElem(1));
console.log(list.locateElem(3));
list.clearList();
console.log(list.traverseList());
list.listHeadAppend(0);
console.log(list.traverseList());
list.listHeadAppend(1);
console.log(list.traverseList());
list.listHeadAppend(2);
console.log(list.traverseList());
list.clearList();
console.log(list.traverseList());
list.listTailAppend(0);
console.log(list.traverseList());
list.listTailAppend(1);
console.log(list.traverseList());
list.listTailAppend(2);
console.log(list.traverseList());
list.destoryList();
// console.log(list.traverseList());





