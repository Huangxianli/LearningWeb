export default {
  state: () => ({
    module1A: '', // 要访问的话：$store.state.module1.module1A
  }),
  getters: {
    module1Getter (state, getters, rootState, rootGetters) { // 没有开启 namespaced 的情况下，所有的 getters 都是挂载一层，会有同名冲突
      // getters 和 rootGetters 如果在没有设置 namespaced 的情况下，是相同的值
      console.log('getters');
      console.log('1', state);
      console.log('2', getters);
      console.log('3', rootState);
      console.log('4', rootGetters);
      return state.module1A;
    }
  },
  mutations: {
    module1MutationA (state, payload) {
      state
      payload
      // commit('XXXX', payload); // 没有开启 namespaced 的情况下，所有的 mutations 都是挂载一层的，如果 commit，那么同名的都会被触发
      // 在设置了 namespaced 后，要触发根组件的，添加参数 {root: true}
    }
  },
  actions: {
    module1ActionA ({ commit, state, rootState }, payload) {
      state, rootState, commit, payload;
      // dispatch('XXX', payload);// 没有开启 namespaced 的情况下，所有的 mutations 都是挂载一层的，如果 dispatch，同名的都会触发
      // 在设置了 namespaced 后，要触发根组件的，添加参数 {root: true}
    }
  },
  // namespaced: true, // 如果配置了 namespaced，那么 getters mutations actions 都会自动根据模块注册的路径调整命名
}