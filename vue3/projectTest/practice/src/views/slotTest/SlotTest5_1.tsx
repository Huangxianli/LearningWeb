import { ref, defineSlots, h, useSlots } from 'vue';
import type { Ref } from 'vue';
import type { ListItem } from './types';
export default {
  setup() {
    const list = ref<ListItem[]>([
      { id: 0, name: 'name0' },
      { id: 1, name: 'name1' },
    ]);
    const slots =
      defineSlots<{
        default: (props: { list: Ref<ListItem[]> }) => any;
      }>() ?? useSlots();
    // 注意 defineSlots() 只能在 <script setup> 中使用
    return () =>
      h('div', null, slots.default ? slots.default({ list }) : '默认的内容');
  },
};
