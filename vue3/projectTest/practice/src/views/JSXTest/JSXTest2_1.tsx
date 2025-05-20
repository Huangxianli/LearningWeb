import { ref, useSlots, defineComponent } from 'vue';
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
    return () => (
      <>
        <div>{slots.default ? slots.default({ list: list.value }) : null}</div>
        <div>{slots.footer ? slots.footer() : null}</div>
      </>
    );
  },
});
