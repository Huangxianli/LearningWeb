<template>
  <div class="list-box">
    <ListSearch />
    <ListSearchResult />
    <ListChecked />
  </div>
</template>

<script>
import ListSearch from './ListSearch.vue';
import ListSearchResult from './ListSearchResult.vue';
import ListChecked from './ListChecked.vue';

export default {
  components: {
    ListSearch,
    ListSearchResult,
    ListChecked,
  }

}
</script>

<style scoped>
.list-box {
  width: 500px;
  padding: 10px;
  max-height: 1000px;
  border: 1px solid red;
}
</style>