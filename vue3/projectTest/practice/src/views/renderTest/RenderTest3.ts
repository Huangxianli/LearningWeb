import { defineComponent, h, nextTick, ref } from 'vue';
import RenderTest3_1 from './RenderTest3_1';

type RenderTest3_1Type = InstanceType<typeof RenderTest3_1>;
type DefaultSlotType = RenderTest3_1Type['$slots']['default'];
type ParmarsType<T> = T extends (props: infer P) => any ? P : never;
type DeafaultSlotParamsType = ParmarsType<DefaultSlotType>;

export default defineComponent({
  setup() {
    const ulRef = ref();
    return () =>
      h('div', null, [
        h('h3', '插槽'),
        h(RenderTest3_1, null, {
          default: ({ list }: DeafaultSlotParamsType) => [
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
