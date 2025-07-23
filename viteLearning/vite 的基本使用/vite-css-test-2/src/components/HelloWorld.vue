<script setup lang="ts">
import { ref } from 'vue';

import ModuleCssTest from './ModuleCssTest.vue';

const count = ref(0);
</script>

<template>
  <div class="card">
    <button class="add_button" type="button" @click="count++">
      count is {{ count }}
    </button>
    <ModuleCssTest />
  </div>
</template>

<style scoped lang="less">
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .add_button {
    height: 30px;
    background-color: #333;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
