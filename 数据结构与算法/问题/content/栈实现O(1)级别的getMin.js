/**
 * 用栈来实现O(1)级别的getMin利用栈的存入和读取都是O(1)级别的。
 *开辟两个栈，其中一个栈用来存当前入栈元素中的最小元素，和另一个栈同步压入和取出
 */

class Stack {
  head = null;
  #minHead = null;
  #creatNode (nodeData) {
    return {
      data: nodeData,
      next: null
    };
  };
  appendData () {

  };
};
