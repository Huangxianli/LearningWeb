<script setup lang="ts"></script>

<template>
  <div v-if="$slots.header" class="slot_test_1_header">
    <!-- 只有在使用该组件的时候，使用了 header 插槽才会渲染这个 div，可以用这个来控制一些只有使用插槽才会有的统一样式 -->
    <slot name="header"></slot>
  </div>
  <div class="slot_test_1_default">
    <slot name="default"> 默认的内容 </slot>
  </div>
  <div v-if="$slots.footer" class="slot_test_1_footer">
    <slot name="footer"></slot>
  </div>
</template>

<style scoped>
.slot_test_1_header {
  height: 48px;
  background-color: #ccc;
}
.slot_test_1_default {
  height: 100px;
  overflow: auto;
}
.slot_test_1_footer {
  height: 48px;
  background-color: #ccc;
}
</style>
