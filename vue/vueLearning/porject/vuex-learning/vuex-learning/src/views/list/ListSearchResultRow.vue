<template>
  <div class="list-search-result-row">
    <div class="row-info">
      <span class="goods">{{ '1' }}</span>
      <span class="price">{{ '2' }}</span>
    </div>
    <div>
      <button>选中</button>
      <button>取消选中</button>
    </div>
  </div>

</template>

<script>
export default {

}
</script>

<style scoped>
.list-search-result-row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid greenyellow;
  font-size: 16px;
  line-height: 1.5;
}

.row-info {
  max-width: 300px;
}

.goods {
  display: inline-block;
  width: 250px;
}

.price {
  display: inline-block;
  width: 50px;
}
</style>