export default {
  clicksGetter: (state, getters) => getters && state.clicks > 10 ? 0 : 10,
  clicksGetter1: (state, getters) => (data) => getters.clicksGetter - data, // 这种写法接受参数 data，当成函数使用 store.getter.clickGetter(1)，但是这样就失去了缓存
}