class DoubleLink {
  head = null;
  #createNode (nodeData) {
    return {
      pre: null,
      data: nodeData,
      next: null
    }
  };
  #getLastNode () {
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    };
    return currentNode;
  };
  appendNode (nodeData) {
    const newNode = this.#createNode(nodeData);
    if (this.head === null) {
      this.head = newNode;
    } else {
      const lastNode = this.#getLastNode();
      lastNode.next = newNode;
      newNode.pre = lastNode;
    };
    return this;
  };

  stringDoubleLink () {
    let data = 'head';
    let doubleLinek = this.head;
    while (doubleLinek) {
      data = `${data} -> ${doubleLinek.data}`;
      doubleLinek = doubleLinek.next;
    };
    data = `${data} -> NULL`
    return data;
  };

  /**
   * 实现双链表的反转
   */
  revertLink () {
    let pre = null;
    let next = this.head;
    while (next !== null) {
      next = this.head.next;
      this.head.next = pre;
      this.head.pre = next;
      pre = this.head;
      this.head = next;
    };
    this.head = pre;
  };
};

const doubleLinke1 = new DoubleLink();
doubleLinke1.appendNode(1).appendNode(2).appendNode(3);
const stringDoubleLink1_1 = doubleLinke1.stringDoubleLink();
console.log(stringDoubleLink1_1); // head -> 1 -> 2 -> 3 -> NULL
doubleLinke1.revertLink();
const stringDoubleLink1_2 = doubleLinke1.stringDoubleLink();
console.log(stringDoubleLink1_2); // head -> 3 -> 2 -> 1 -> NULL
