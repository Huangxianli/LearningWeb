import { ref, useSlots, defineComponent } from 'vue';
// import { defineSlots } from 'vue';
// import type { VNodeChild } from 'vue';
import type { Ref } from 'vue';
import type { ListItem } from './types';
export default defineComponent({
  setup() {
    const list: Ref<ListItem[]> = ref([
      {
        id: 0,
        name: 'name0',
      },
    ]);
    const slots = useSlots();
    /* 
    // 如果是在 ts 且 script steup 中，推荐使用 defineSlots 宏（只能在 script setup 中使用）
    const slots = defineSlots<{
      default(props: { list: ListItem[] }): VNodeChild;
      footer(): VNodeChild;
    }>();
     */
    return () => (
      <>
        <div>{slots.default ? slots.default({ list: list.value }) : null}</div>
        <div>{slots.footer ? slots.footer() : null}</div>
      </>
    );
  },
});
