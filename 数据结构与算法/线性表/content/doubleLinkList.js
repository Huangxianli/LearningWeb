/**
 * 线性表的双链表实现
 */
class DoubleLinkList {
  list = {};

  #createNode (data) {
    return {
      prior: null,
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

};