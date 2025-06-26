<script setup lang="ts">
import { useRouter } from 'vue-router';
import { usePiniaTestStore } from '@/stores/piniaTest';
const router = useRouter();

const { testList } = usePiniaTestStore();

const clickHandler = (e: MouseEvent) => {
  const target = e.target;
  if (!(target instanceof HTMLLIElement)) {
    return;
  }
  const id = target.dataset.id;
  if (id) {
    router.push({
      name: 'piniaTestDetail',
      params: { id },
    });
  }
};
</script>

<template>
  <div class="pinia-test-list">
    <ul @click="clickHandler">
      <li v-for="(item, index) in testList" :key="item.id" :data-id="item.id">
        {{ `${index + 1} -- ${item.name} -- ${item.discription}` }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.pinia-test-list {
  display: flex;
  padding: 20px;
  height: calc(100% - 40px);
  flex-direction: column;
  li {
    cursor: pointer;
  }
}
ul {
  list-style: none;
  padding: 0;
}
</style>
