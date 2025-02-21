<template>
  <section>
    订单详情页 {{ $route.params.id }}-{{ id }}
    <button @click="goToFirstOrderDetail">跳转到第一个订单详情</button>
  </section>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: '',
      required: true,
    }
  },
  // 组件内的路由守卫
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件对应的路由被 confirm 之前调用；不能访问 this，这个守卫执行的时候，
    to;
    from;
    // next();
    next(vm => {
      vm; // 由于 beforeRouteEnter 路由守卫中还拿不到 组件的实例，使用这个方法拿，这个回调会在导航被确认的时候调用
      // 注意只有这个守卫的 next 支持回调函数，其他的都不支持
    })
  },
  beforeRouteUpdate (to, from, next) {
    // 路由改变，但是复用该组件的时候
    to;
    from;
    next();
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的的对应的路由时触发
    to;
    from;
    next();
  },
  methods: {
    goToFirstOrderDetail () {
      this.$router.push({
        name: 'orderDetail',
        params: {
          id: 1
        }
      })
    }
  },
}
</script>

<style></style>