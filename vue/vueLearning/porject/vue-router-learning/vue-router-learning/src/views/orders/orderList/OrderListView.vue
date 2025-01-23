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
      debugger
      // 如果没有加 /，会从当前的根路由开始算起
      // this.$router.push(`${id}/orderDetail`);
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