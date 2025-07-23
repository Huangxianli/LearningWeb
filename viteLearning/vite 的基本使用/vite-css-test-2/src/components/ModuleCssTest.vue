<script setup lang="ts">
import { ref } from 'vue';

import ImportModuleCssTest from './moduleCssTest.module.css';

const count = ref<number>(0);
const handlerClick = () => {
  count.value++;
};
</script>

<template>
  <div :class="$style.moduleTest">
    <button @click="handlerClick" :class="moduleTest.button">
      点击 <span :class="ImportModuleCssTest.countClass">{{ count }}</span>
    </button>
  </div>
</template>

<style module>
/* module 没有名称的时候，在 template 中使用要使用 $style.xxx */
.moduleTest {
  margin-top: 8px;
}
</style>

<style module="moduleTest">
.button {
  height: 30px;
  background-color: white;
  color: #333;
  border: 1px solid #333;
  border-radius: 5px;
  cursor: pointer;
}
</style>
