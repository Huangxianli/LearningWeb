const mixin = {
  data: () => ({
    data1: 1,
    data2: 2,
  }),
  beforeCreate () {
    console.log('测试声明周期钩子的合并：执行了mixin中的beforeCreate生命钩子');
  },
  clickBtn () {
    // methods、components、derctives，都会合并成一个对象，有冲突的以组件自己定义的为准
    console.log('测试methods、components、derctives的混入，执行了mixin中的methods clickBtn');
  },
};
export default mixin;