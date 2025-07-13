import { type FunctionalComponent, type PropType } from 'vue';

type FnProps = {
  count: number;
  addCount: () => void;
};
type FnEvent = {};

const FunctionalTest2: FunctionalComponent<FnProps, FnEvent> = function (
  props
) {
  const clickBtn = () => {
    props.addCount();
  };
  return (
    <>
      <div>{props.count}</div>
      <button onClick={clickBtn}>点击增加</button>
    </>
  );
};

// 注意，如果没有这里对于 addCount 的写法，会导致在使用该组件的时候，addCount 的传递只能是 addCount 不能是 add-count
FunctionalTest2.props = {
  count: {
    type: Number,
    default: 0,
    required: true,
  },
  addCount: {
    type: Function as PropType<() => void>,
    default: () => {},
    required: true,
  },
};
export default FunctionalTest2;
