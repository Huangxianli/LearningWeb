import { defineComponent, h, ref } from 'vue';
import type { Ref } from 'vue';

export default defineComponent({
  emits: {
    showChange: (_: boolean) => true,
  },
  setup(_, { emit }) {
    const showItem: Ref<boolean> = ref(true);
    return () =>
      h('div', null, [
        showItem.value ? h('div', null, 'div 的内容') : null,
        h(
          'button',
          {
            onClick: () => {
              showItem.value = !showItem.value;
              emit('showChange', showItem.value);
            },
          },
          showItem.value ? '隐藏' : '显示'
        ),
      ]);
  },
});
