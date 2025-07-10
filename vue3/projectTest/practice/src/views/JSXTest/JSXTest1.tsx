import { defineComponent, ref } from 'vue';
import type { Ref } from 'vue';
import type { ListItem } from './types';

let listOut: ListItem[] = [
  { id: 0, name: 'name0' },
  { id: 1, name: 'name1' },
  { id: 2, name: 'name2' },
];
const listNodeOut = (
  // 编译时 listNodeOut 转化成 h 函数，在模块加载时 转化成 vnode，这个时候，listNodeOut 就成了一个快照，setup 还没执行，甚至可以说组件实例还没有被创建
  <ul>
    {listOut.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);

export default defineComponent({
  setup() {
    const isShowList: Ref<boolean> = ref(false);
    const list: Ref<ListItem[]> = ref([
      { id: 0, name: 'name0' },
      { id: 1, name: 'name1' },
      { id: 2, name: 'name2' },
    ]);
    const listNode = (
      // 这里不会由于 list 内容的增加而重新计算，因为这是定义在 setup 中的变量，响应式变量的变化，并不会重新执行 setup，也就不会重新计算 listNode
      // 在 setup 内部的 jsx 写法，在 setup return 前就已经 jsx -> h() -> vnode 转化成了 vnode，和响应式变量已经没有关系了，即使是里面的响应式变量在后面发生改变，这里也不会变，就是一张快照
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
      listOut.push({
        id: list.value.length,
        name: `name${list.value.length}`,
      });
    };

    return () => (
      // 注意，这里不能直接是一个变量，如果是一个变量的话，一般是定义在 setup 中的，响应式数据变化的时候，setup 不会重新执行，该变量就不会重新被赋值，一直使用的是第一次渲染时的值
      <>
        <h3>jsx 的基础使用</h3>
        <div>{isShowList.value ? listNodeOut : <></>}</div>
        <div>{listOut}</div>
        <div>{isShowList.value ? listNode : <></>}</div>
        <div>{list.value}</div>
        <div>{isShowList.value ? listNode1() : <></>}</div>
        <div>{list.value}</div>
        <button onClick={changeListShow}>
          {isShowList.value ? '隐藏' : '显示'}
        </button>
        <button onClick={addListItem}>增加</button>
      </>
    );
  },
});
