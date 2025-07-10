import { ElCard } from 'element-plus';
import { defineComponent, ref, h } from 'vue';

export default defineComponent({
  setup() {
    // const inputRef: Ref<HTMLInputElement | null> = ref(null);
    const arr = ref<number[]>(
      Array.from({ length: 10 }).map((_, index) => index)
    );
    const inputRefsMap: Map<number, HTMLInputElement> = new Map();
    const setInputRefs = (el: Element | null, key: number) => {
      console.log('key el', key, ' ', el);
      if (el) {
        inputRefsMap.set(key, el as HTMLInputElement);
      } else {
        inputRefsMap.delete(key);
      }
    };
    const deleteSecond = () => {
      arr.value.splice(1, 1);
    };
    const focus0 = () => {
      inputRefsMap.get(0)!.focus();
    };
    return () =>
      h(ElCard, [
        h('h3', 'h 函数的写法'),
        h('div', {}, [
          arr.value.map((item) =>
            h('div', { key: item }, [
              item,
              h('input', {
                ref: (el) => setInputRefs(el as Element | null, item),
              }),
            ])
          ),
          h(
            'button',
            {
              onClick: deleteSecond,
            },
            '删除第二个'
          ),
          h(
            'button',
            {
              onClick: focus0,
            },
            '聚焦0'
          ),
        ]),
      ]);
  },
});
