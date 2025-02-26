export default {
  increment (state, payload = { count: 1 }) {
    state.clicks += payload.count;
    console.log(state);
    console.log(this.getters.module1Getter); // 如果没有使用 namescoped，那么 getters mutations actions 都会挂在同级
  }
};