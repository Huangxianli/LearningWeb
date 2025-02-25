<template>
  <div class="list-sreach-reasult">
    <div class="list-sreach-reasult-title">
      搜索结果
    </div>
    <ListSearchResultRow />
  </div>
</template>

<script>
import ListSearchResultRow from './ListSearchResultRow.vue';
export default {
  components: {
    ListSearchResultRow,
  }
}
</script>

<style scoped>
.list-sreach-reasult {
  margin: 5px;
  padding: 5px;
  border: 1px dotted rgb(47, 0, 255);
}

.list-sreach-reasult-title {
  color: gray;
  border-bottom: 1px dotted gray;
  margin-bottom: 5px
}
</style>