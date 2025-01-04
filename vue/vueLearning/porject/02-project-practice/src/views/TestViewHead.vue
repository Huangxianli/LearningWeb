<template>
  <div class="test-head">
    <div class="name-box">{{ name }}</div>
    <GoHomeVue />
  </div>
</template>

<script>
import GoHomeVue from './GoHome.vue';

import routerMap from '@/utils/testViewMap.js';
export default {
  components: {
    GoHomeVue,
  },
  props: {
    compName: {
      type: String,
      default: '',
      required: true,
    }
  },
  computed: {
    name () {
      return routerMap.get(this.compName)?.name;
    },
  },
}
</script>

<style>
.test-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.name-box {
  line-height: 36px;
  margin-right: 8px;
}
</style>