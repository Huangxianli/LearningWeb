import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

import module1 from './modules/module1';

Vue.use(Vuex); // 配合 new Vue({ store }) 将 store 以注入到每一个子组件里面，这样就不要每个组件都引入 store 对象了；直接通过 this.$store 就可以访问了

/**
 * 1. Vuex 的状态存储是响应式的
 * 2. 不能直接改变 store 中的状态，应该限制修改 store 中状态的唯一途径为 commit mutation
 */
const store = new Vuex.Store({
  state: { // state 数据在 Vue 组件中，可以通过 computed 转化一层
    clicks: 0,
  },
  getters: { // 相当与 computed
    ...getters,
  },
  mutations: mutations,
  actions: actions,
  modules: {
    module1: module1,
  },
});
// 还可以用这种方式来注册模块
// 注册嵌套模块 `nested/myModule`,
// store.registerModule(['nested', 'myModule'], {
//   // ...
// })

// 可以使用 store.unregisterModule(moduleName) 来动态卸载模块。注意，你不能使用此方法卸载静态模块（即创建 store 时声明的模块）
// 可以通过 store.hasModule(moduleName) 方法检查该模块是否已经被注册到 store
export default store;
