<template>
  <div>
    <div>练习 Vuex</div>
    <span>clicks: {{ clicks }}</span><br />
    <span>clicks1: {{ clicks1 }}</span><br />
    <span>clicks2: {{ clicks2 }}</span><br />
    <span>clicks3: {{ clicks3 }}</span><br />
    <span>clicks4: {{ clicks4 }}</span><br />
    <span>clicksGetter: {{ clicksGetter }}</span><br />
    <span>clicksGetter1: {{ clicksGetter1 }}</span><br />
    <span>clicksGetter2: {{ clicksGetter2 }}</span><br />
    <button @click="increment2">增加</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
// 这几个函数如果是在 namespaced 为 true 的时候，第一个参数传入模块路径，可以省下很多的字符
export default {
  computed: {
    ...mapState(['clicks']),
    ...mapState({
      clicks1: state => state.clicks,
      clicks2: 'clicks',
      clicks3 (state) {
        return state.clicks;
      },
    }),
    clicks4 () {
      return this.$store.state.clicks;
    },

    ...mapGetters(['clicksGetter']),
    clicksGetter1 () {
      return this.$store.getters.clicksGetter;
    },
    ...mapGetters({
      clicksGetter2: 'clicksGetter', // 不像 mapState，这里的值对应的只能是 字符串
    }),
  },
  methods: {
    increment2 () {
      // this.$store.commit('increment'); // 一定要注意，要限制修改 store 中的状态的唯一方法为  commit mutation
      // this.$store.commit({ type: 'increment', count: 4 });
      // this.increment(4);
      // this.$store.dispatch('asyncIncrement', { count: 1 });
      this.asyncIncrement({ count: 12 })


    },
    ...mapMutations(['increment']),
    ...mapMutations({
      increment1: 'increment'
    }),
    ...mapActions(['asyncIncrement']),
  }
}
</script>

<style></style>