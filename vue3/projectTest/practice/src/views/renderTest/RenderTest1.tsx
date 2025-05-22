import { defineComponent, ref, h } from 'vue';
import type { Ref } from 'vue';
import type { ListItem } from './types';
export default defineComponent({
  setup() {
    const list: Ref<ListItem[]> = ref([
      { id: 0, name: 'name0' },
      { id: 1, name: 'name1' },
      { id: 2, name: 'name2' },
    ]);
    return () =>
      h('div', null, [
        h(
          'ul',
          null,
          list.value.map((item) => h('li', { key: item.id }, item.name))
        ),
      ]);
  },
});
