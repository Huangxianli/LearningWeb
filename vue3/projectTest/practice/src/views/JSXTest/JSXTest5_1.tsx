import { defineComponent, ref, h } from 'vue';
export default defineComponent({
  setup() {
    const liMap = ref([{}, {}, {}]);
    const ul = h(
      'ul',
      liMap.value.map((_, index) => h('li', index))
    );
    const handlerClick = () => {
      liMap.value.push({});
    };
    return () => (
      <>
        {ul}
        {/* ul 在进入 return 之前已经被转化成了 vnode，就是一张快照了，不会随着响应式属性变化而变化了 */}
        <ul>
          {liMap.value.map((_, index) => (
            <li>{index}</li>
          ))}
        </ul>
        <button onClick={handlerClick}>增加</button>
      </>
    );
  },
});
