import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';
import vuexTest1 from './modules/vuexTest1.js'

Vue.use(Vuex);

const state = {};

const store = new Vuex.Store({
  strict: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    vuexTest1
  },
});

export default store;

/**
 * state 映射到computed中
 * 
 * store.state.count
 * 
 * mapState({
 *   count: state => state.count,
 *   count: 'count',
 *   count(state) {
 *     return state.count
 *   }
 * });
 * ...mapState({});
 * 
 */

/**
 * getter 可以看作是store的计算属性，和computed一样会被缓存起来
 * getter: {
 *   countGetter: (state, getters) => state.count,
 *   filterList: (state, getter) => (id) => state.todoList.filter(item => item.id === id); // 写成方法，不会缓存
 * }
 * 
 * store.getter.countGetter
 * 
 * 映射到computed中
 * mapGetters({
 *   countGetter: 'countGetter'
 * });
 * 
 */

/**
 * mutation 更改state的唯一方法应该是提交mutation，而且应该是mutation里面应该是同步的代码
 * mutations: {
 *   increment (state, payload) {
 *     state.count = state.count + payload.count;
 *   },
 * },
 * 
 * store.commit('increment', {count: 1});
 * store.commit({
 *   type: 'increment',
 *   count: 1,
 * });
 * 
 * 映射在methods中
 * mapMutations({
 *   increment: 'increment',
 * }),
 */

/**
 * action是提交mutation，不是直接变更状态
 * action中可以进行异步操作
 * 
 * actions: {
 *   increment (context, payload) {
 *     setTimeout(() => {
 *       context.commit('increment', payload); // 提交一个mutation
 *     });
 *   },
 * },
 * 
 * store.dispatch('increment', {count: 1}); // 分发一个action
 * store.dispatch({
 *   type: 'increment',
 *   count: 1,
 * }); // 分发一个action
 * 
 * 映射到methods中
 * mapActions({
 *   increment: 'increment',
 * })
 * 
 */

/**
 * modules: {
 *   a: {
 *     namespaced: true, // 设置为true之后，除了state 都要 ['a/XXX']这样来访问getters commit()和dispatch()默认的是触发当前组件模块的，第三个参数 {root: true}就会触发根的
 *     state:() => ({})，
 *     getters: {}, // 参数 state, getters, rootState， rootGetters
 *     mutations: {}, // 参数 state, payload, 
 * ....actions: {}, // context: {state, rootState, getters, rootGetters, commit}, payload
 *   }
 * }
 * 
 * 启用了命名空间之后
 * mapState({
 *   count: state => state.moduleA.moduleA_1.count,
 * })
 * mapGetters('moduleA/moduleA_1', {})
 * 
 * 要想省略，可以用
 * const {mapStata, mapGetters} = createNamespacedHelpers('moduleA/moduleA_1')
 * 
 */

