/**
 * 线性表的顺序表实现
 */

class ST {
  #MaxLength = 1000;
  list;
  // 初始化，创建一个空的线性表
  initList () {
    this.list = {
      ele: [],
      length: 0,
    };
  };
  destoryList () {
    this.list = {};
  };
};

const st1 = new ST();
st1.initList();
