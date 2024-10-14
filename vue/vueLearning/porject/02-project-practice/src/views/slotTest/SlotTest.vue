<template>
  <div>
    <SlotTest1>
      <template>
        <div>
          {{ data1 }}
        </div>
      </template>
      <!-- <template v-slot:content="{ content }">
        {{ content }}
      </template> -->
      <!-- 作用域插槽使用简写 -->
      <template #content="{ content }">
        {{ content }}
      </template>
    </SlotTest1>
    <hr />
    <SlotTest2>
      <template #listItemContent="{ listItemInfo }">
        <span class="slot-test-2__list-item-value">
          {{ listItemInfo.value }}
        </span>
      </template>
    </SlotTest2>
    <hr />
    <SlotTest2_0></SlotTest2_0>
  </div>
</template>

<script>
import SlotTest1 from './SlotTest1.vue';
import SlotTest2 from './SlotTest2.vue';
import SlotTest2_0 from './SlotTest2_0.js';

export default {
  components: {
    SlotTest1,
    SlotTest2,
    SlotTest2_0
  },
  data () {
    return {
      data1: '1'
    }
  },
  mounted () {
    setTimeout(() => {
      this.data1 = '2'
    }, 1000);
  },
}
</script>

<style></style>