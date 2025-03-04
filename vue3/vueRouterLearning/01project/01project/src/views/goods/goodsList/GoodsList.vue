<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
interface goodsItem {
  name: string;
  id: string;
};

const router = useRouter();


const goodsList = reactive<goodsItem[]>([
  {
    name: '1',
    id: '1',
  },
  {
    name: '2',
    id: '2',
  },
  {
    name: '3',
    id: '3',
  },
]);
const handleClick: (id: string) => void = (id) => {
  router.push({
    name: 'goodsInfo',
    params: {
      goodsId: id,
    }
  })

}
</script>

<template>
  <ul>
    <li v-for="item in goodsList" :key="item.id" @click="handleClick(item.id)">{{ item.name }}</li>
  </ul>
</template>

<style scoped></style>