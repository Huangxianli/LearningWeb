<script setup lang="ts"></script>

<template>
  <div class="test1">
    <ul class="test1-li">
      <li>test1Child1</li>
      <li>test1Child2</li>
      <li>test1Child3</li>
    </ul>
    <div class="test1-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.test1 {
  display: flex;
  flex-direction: row;
}

.test1-li {
  width: 100px;
  list-style-type: none;
  padding: 0;
}

.test1-content {
  border: 1px solid red;
  width: 100%;
}
</style>