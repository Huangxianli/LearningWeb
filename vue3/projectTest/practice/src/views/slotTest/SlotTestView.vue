<script setup lang="ts">
import SlotTest1 from './SlotTest1.vue';
import SlotTest2 from './SlotTest2.vue';
import SlotTest3 from './SlotTest3.vue';
import SlotTest4 from './SlotTest4.vue';
import SlotTest5 from './SlotTest5.vue';
</script>

<template>
  <el-card>
    <SlotTest1></SlotTest1>
  </el-card>
  <el-card>
    <SlotTest2> </SlotTest2>
  </el-card>
  <el-card>
    <SlotTest3></SlotTest3>
  </el-card>
  <el-card>
    <SlotTest4></SlotTest4>
  </el-card>
  <el-card>
    <SlotTest5></SlotTest5>
  </el-card>
</template>

<style scoped></style>
