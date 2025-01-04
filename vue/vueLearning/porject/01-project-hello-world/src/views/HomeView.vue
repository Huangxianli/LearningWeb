<template>
<div>
  这里是HomeView组件
  <ul class="goods-ul">
    <li 
      v-for="goods in goodsList" 
      :key="goods.id" 
      class="goods-li"
      title="点击跳转到详情页"
      @click="clickGood(goods.id)"
      >
      {{goods.name}}
    </li>

  </ul>
</div>
</template>

<script>
export default {
  data: () => ({
    goodsList: [
      { id: 1, name: '西瓜' },
      { id: 2, name: '哈密瓜' },
      { id: 3, name: '甜瓜' },
    ],
  }),
  methods: {
    clickGood (id) {
      this.$router.push(
          // /good/:id 匹配的方法只有这两个 要么name+params，要么path直接拼接出完整path，
          // 应该只 path+query （.../a?query1=""&query2="） 、name + params （匹配动态路由，/a/:params1） 这两种写法，因为提供了path，params就会被忽略
        {
          // path: `/goods/${id}`, // /goods/id
          name: 'goods',
          params: {id: id} , 
        }
      )
    },
  },

}
</script>

<style scoped>
.goods-ul {
  padding: 0;
}
.goods-li {
  list-style-type: none;
  cursor: pointer;
  height: 24px;
  line-height: 24px;
}

</style>
