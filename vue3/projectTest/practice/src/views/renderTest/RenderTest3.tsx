import { defineComponent, h, nextTick, ref } from 'vue';
import RenderTest3_1 from './RenderTest3_1';
import type { ListItem } from './types';
export default defineComponent({
  setup() {
    const ulRef = ref();
    return () =>
      h('div', null, [
        h(RenderTest3_1, null, {
          default: ({ list }: { list: ListItem[] }) => [
            h(
              'ul',
              {
                style: {
                  maxHeight: '100px',
                  overflow: 'auto',
                },
                ref: ulRef,
              },
              list.map((item) => h('li', { key: item.id }, item.name))
            ),
            h(
              'button',
              {
                onClick: () => {
                  list.push({
                    id: list.length,
                    name: `name${list.length}`,
                  });
                  nextTick(() => {
                    ulRef.value.scrollTo({
                      top: ulRef.value.scrollHeight,
                      behavior: 'smooth',
                    });
                  });
                },
              },
              '新增'
            ),
          ],
        }),
      ]);
  },
});
