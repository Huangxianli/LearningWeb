import { defineComponent, ref } from 'vue';
import type { Ref } from 'vue';
import type { ListItem } from './types';

export default defineComponent({
  setup() {
    const isShowList: Ref<boolean> = ref(true);
    const list: Ref<ListItem[]> = ref([
      { id: 0, name: 'name0' },
      { id: 1, name: 'name1' },
      { id: 2, name: 'name2' },
    ]);
    const listNode = (
      // 这里不会由于 list 内容的增加而重新计算，因为这是定义在 setup 中的变量，响应式变量的变化，并不会重新执行 setup，也就不会重新计算 listNode
      <ul>
        {list.value.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
    const listNode1 = () => (
      // 可以是一个函数，每次重新调用函数的时候，都会重新计算返回值
      <ul>
        {list.value.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );

    const changeListShow = () => {
      isShowList.value = !isShowList.value;
    };
    const addListItem = () => {
      list.value.push({
        id: list.value.length,
        name: `name${list.value.length}`,
      });
    };

    return () => (
      // 注意，这里不能直接是一个变量，如果是一个变量的话，一般是定义在 setup 中的，响应式数据变化的时候，setup 不会重新执行，该变量就不会重新被赋值，一直使用的是第一次渲染时的值
      <>
        <div>{isShowList.value ? listNode : <></>}</div>
        <div>{isShowList.value ? listNode1() : <></>}</div>
        <button onClick={changeListShow}>
          {isShowList.value ? '隐藏' : '显示'}
        </button>
        <button onClick={addListItem}>增加</button>
      </>
    );
  },
});
