<template>
  <section>
    商品详情页
    <GoodsTitle :title="`${$route.params.goodsId}对应的商品标题`" />
  </section>
</template>

<script>
// import GoodsTitle from './GoodsTitle.vue';
export default {
  components: {
    GoodsTitle: () => ({
      component: new Promise(resolve => {
        setTimeout(() => {
          resolve(import('./GoodsTitle.vue'));
        }, 2000);
      }),
      loading: {
        render (h) {
          return h('div', '加载中');
        }
      },
    })
  },
  async created () {
    // 如果从 /goodsInfo/1 进入到 /goodsInfo/2 时，created 不会被调用，因为动态路由的方式，组件实例是被复用的；那么存在生命周周期钩子里的内容不会再次调用的情况，可以通过监听路由变化来处理，或者是导航守卫来处理
    const params = this.$route.params; // 获取整个路由上的所有的路径参数 /goodsInfo/:goodsId 会获取到 goodsId 的值
    console.log(params); // { goodsId: '1' }
    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    console.log('created'); // 注意这里的输出会比后面beforeMount的输出晚，并不是执行完一个生命周期函数再执行下一个生命周期函数
  },
  beforeMount () {
    console.log('beforeMount');
  }
}
</script>

<style></style>