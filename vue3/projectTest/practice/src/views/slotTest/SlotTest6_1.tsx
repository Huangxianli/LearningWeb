import {
  defineComponent,
  ref,
  type SlotsType,
  type VNodeChild,
  type Ref,
} from 'vue';
import type { ListItem } from './types';
export default defineComponent({
  slots: {} as SlotsType<{
    default: (props: { list: Ref<ListItem[]> }) => VNodeChild;
  }>,
  setup(_, { slots }) {
    const list = ref<ListItem[]>([
      { id: 0, name: 'name0' },
      { id: 1, name: 'name1' },
    ]);
    return () => (
      <>
        <h3>jsx 中定义和使用</h3>
        <div>{slots.default ? slots.default({ list }) : '默认插槽'}</div>
      </>
    );
  },
});
