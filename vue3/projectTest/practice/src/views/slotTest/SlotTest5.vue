<script setup lang="ts">
import SlotTest5_1 from './SlotTest5_1';
import { h } from 'vue';
import type { Ref } from 'vue';
import type { ListItem } from './types';

const addItem = (list: Ref<ListItem[]>) => {
  list.value.push({
    id: list.value.length,
    name: `name${list.value.length}`,
  });
};

type DeafaultSlotType = InstanceType<typeof SlotTest5_1>['$slots']['default'];
type ParmarsType<T> = T extends (props: infer P) => any ? P : never;
type DeafaultSlotParamsType = ParmarsType<DeafaultSlotType>;

const SlotTest5_1H = () =>
  h(SlotTest5_1, null, {
    default: (slotProps: DeafaultSlotParamsType) =>
      h(
        'div',
        slotProps.list.value.map((item) =>
          h(
            'div',
            {
              key: item.id,
            },
            item.name
          )
        )
      ),
  });
</script>

<template>
  <SlotTest5_1 #default="{ list }">
    <div v-for="item in list.value" :key="item.id">{{ item.name }}</div>
    <!-- 注意这里的 list 没有被解包 -->
    <el-button @click="addItem(list)">增加</el-button>
  </SlotTest5_1>
  <SlotTest5_1H></SlotTest5_1H>
</template>

<style scoped></style>
