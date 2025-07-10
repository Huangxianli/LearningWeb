import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
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
    const focus3 = () => {
      inputRefsMap.get(3)?.focus();
    };
    const deletSecond = () => {
      arr.value.splice(1, 1);
    };
    return () => (
      <el-card>
        <h3>jsx 中使用</h3>
        {arr.value.map((value) => (
          <div key={value}>
            {value}
            <input
              type="text"
              data-key={value}
              ref={(el) => setInputRefs(el as Element | null, value)}
            />
            {/** jsx 的写法，循环时，不支持一个 ref={refTemplate} */}
          </div>
        ))}
        <button onClick={focus3}>聚焦3</button>
        <button onClick={deletSecond}>删除第二个</button>
      </el-card>
    );
  },
});
