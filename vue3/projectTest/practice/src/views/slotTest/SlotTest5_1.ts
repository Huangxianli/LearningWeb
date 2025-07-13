import { defineComponent, ref, h } from 'vue';
import type { Ref, SlotsType, VNodeChild } from 'vue';
import type { ListItem } from './types';
type SlotType1 = {
  default: (props: { list: Ref<ListItem[]> }) => VNodeChild;
};
export default defineComponent({
  slots: {} as SlotsType<SlotType1>,
  // 如果不加这里，在使用 default 的插槽的时候，list 被结构出来类型会推导成 any
  setup(_, { slots }) {
    const list = ref<ListItem[]>([
      { id: 0, name: 'name0' },
      { id: 1, name: 'name1' },
    ]);
    // const slots =
    //   defineSlots<{
    //     default: (props: { list: Ref<ListItem[]> }) => any;
    //   }>() ?? useSlots();
    // // 注意 defineSlots() 只能在 <script setup> 中使用
    return () =>
      h('div', null, [
        h('h3', 'h 函数中定义和使用'),
        slots.default ? slots.default({ list }) : '默认的内容',
      ]);
  },
});
