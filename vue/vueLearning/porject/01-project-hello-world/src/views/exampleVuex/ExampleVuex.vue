import Vue from 'vue';
<template>
  <div>
    <div class="example-box">
      <h2>example1</h2>
      <VuexTest1 />
    </div>
    <div class="example-box">
      <h2>example2</h2>
      <VuexTest2 />
    </div>
  </div>
</template>

<script>
import VuexTest1 from './vuexTest1/VuexTest1.vue';
import VuexTest2 from './vuexTest2/VuexTest2.vue';

export default {
  components: {
    VuexTest1,
    VuexTest2
  },
}
</script>

<style scoped>
.example-box {
  display: flex;
  flex-direction: column;
}
h2 {
  border-top: 1px dashed gray;
  border-bottom: 1px dashed gray;
}
</style>