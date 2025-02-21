<template>
  <section>
    订单列表页
    <ul @click="handlerClick">
      <li v-for="order in orderList" :key="order.key" :data-id="order.order.id">
        {{ order.order.goodName }}
      </li>
    </ul>
  </section>
</template>

<!-- <script setup>
import { reactive } from "vue";
const orderList = reactive([
  {
    key: 1, order: { id: '1', goodName: '商品1' }
  },
  {
    key: 2, order: { id: '2', goodName: '商品2' }
  },
  {
    key: 3, order: { id: '3', goodName: '商品3' }
  },
  {
    key: 4, order: { id: '4', goodName: '商品4' }
  }
])
</script> -->

<script>

export default {
  data () {
    return {
      orderList: [
        {
          key: 1, order: { id: '1', goodName: '商品1' }
        },
        {
          key: 2, order: { id: '2', goodName: '商品2' }
        },
        {
          key: 3, order: { id: '3', goodName: '商品3' }
        },
        {
          key: 4, order: { id: '4', goodName: '商品4' }
        }
      ]
    };
  },
  methods: {
    handlerClick (e) {
      const id = e.target.dataset.id;
      // 如果没有加 /，相当于 ../，会取当跳转前的路由的倒数第二级，然后 push 中的路径拼接上去 <router-link /> 中的 to 也是这样的表现
      // this.$router.push(`${id}/orderDetail`); // 在路由参数中如果使用了 path 也使用了 params，path 的优先级更高
      this.$router.push({
        name: 'orderDetail',
        params: {
          id: id,
        }
      })

    }
  }
}
</script>

<style scoped></style>