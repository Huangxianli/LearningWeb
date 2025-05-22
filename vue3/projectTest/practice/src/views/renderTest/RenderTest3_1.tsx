import { defineComponent, h, ref } from 'vue';
import type { Ref } from 'vue';
import type { ListItem } from './types';

export default defineComponent({
  setup(_, { slots }) {
    const list: Ref<ListItem[]> = ref([
      { id: 0, name: 'name0' },
      { id: 1, name: 'name1' },
      { id: 2, name: 'name2' },
      { id: 3, name: 'name3' },
    ]);
    return () =>
      h('div', [
        slots.default
          ? slots.default({ list: list.value })
          : 'default 插槽的默认内容',
      ]);
  },
});
