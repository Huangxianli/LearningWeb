export default {
  asyncIncrement (context, payload) {
    setTimeout(() => {
      context.commit('increment', payload);
    }, 500);
  },
}