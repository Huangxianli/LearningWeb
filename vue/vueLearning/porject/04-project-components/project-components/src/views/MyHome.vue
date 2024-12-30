<template>
  <section>
    <TestView1 />
    <TestView2 />
    <TestView3 />
  </section>
</template>

<script>
import TestView1 from './test-view1/TestView1.vue';
import TestView2 from './test-view-2/TestView2.vue';
import TestView3 from './test-view-3/TestView3.vue';
export default {
  components: {
    TestView1,
    TestView2,
    TestView3,
  },
  created () {
    // this.$ajax().then();
  },
}
</script>

<style></style>