class NodeLink {
  head = null;
  #createNode (nodeData) {
    return {
      data: nodeData,
      next: null
    };
  }
  #getLastNode () {
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    };
    return currentNode;
  };

  appendNode (data) {
    const newNode = this.#createNode(data);
    if (this.head === null) {
      this.head = newNode;
    } else {
      const lastNode = this.#getLastNode();
      lastNode.next = newNode;
    };
    return this;
  };
  stringLink () {
    let data = 'head';
    let currentNode = this.head;
    while (currentNode) {
      data = `${data} -> ${currentNode.data}`;
      currentNode = currentNode.next;
    };
    data = `${data} -> NULL`
    return data;
  };

  /**
   * 若现在的链表顺序是 head-> 1 -> 2 -> 3 -> 4 -> NULL
   * 反转之后链表应该为 NULL <- 1 <- 2 <- 3 <- 4 <- head
   * 
   * head向后移动一步，head的next就改为指向前面的那个节点，那么这个时候要有一个pre来记录head前面的节点
   * 这个时候head的next已经改变了，那么head如何之前的链接关系移动呢，就要有一个next来记录head之前的next节点
   */
  revertNode () {
    let pre = null;
    let next = this.head;
    while (next !== null) {
      next = this.head.next;
      this.head.next = pre;
      pre = this.head;
      this.head = next;
    };
    this.head = pre;
  };
};


const nodeLink1 = new NodeLink();
nodeLink1.appendNode(1).appendNode(2).appendNode(3).appendNode(4);
const stringLink1_1 = nodeLink1.stringLink();
console.log(stringLink1_1);
nodeLink1.revertNode();
const stringLink1_2 = nodeLink1.stringLink();
console.log(stringLink1_2);
nodeLink1.appendNode(5);
const stringLink1_3 = nodeLink1.stringLink();
console.log(stringLink1_3);

const nodeLink2 = new NodeLink();
const stringLink2_1 = nodeLink2.stringLink();
console.log(stringLink2_1);
nodeLink2.revertNode();
const stringLink2_2 = nodeLink2.stringLink();
console.log(stringLink2_2);

const nodeLink3 = new NodeLink();
nodeLink3.appendNode(1);
const stringLink3_1 = nodeLink3.stringLink();
console.log(stringLink3_1);
nodeLink3.revertNode();
const stringLink3_2 = nodeLink3.stringLink();
console.log(stringLink3_2);

