import { defineComponent, ref, withModifiers } from 'vue';
export default defineComponent({
  setup() {
    const clicks = ref<number>(0);
    const clickOnce = () => {
      clicks.value++;
    };
    const clickSelf = () => {
      clicks.value++;
    };
    return () => (
      <>
        <div>
          <button onClickOnce={clickOnce}>只进行了一次绑定</button>
          {/* 注意很奇怪的一件事，JSX 的写法，不使用 h 函数 once 如果要支持这种写法，要自己定义一个类型文件来兼容，本项目中是 vue-jsx.d.ts，也就是说，现在的 vue 好像还没支持这种写法  */}
          <div>{clicks.value}</div>
          <button
            onClick={withModifiers(clickSelf, ['self', 'stop'])}
            style={{ padding: '20px', background: 'pinck' }}
          >
            <div
              style={{ height: '20px', width: '20px', background: 'red' }}
            ></div>
          </button>
        </div>
      </>
    );
  },
});
