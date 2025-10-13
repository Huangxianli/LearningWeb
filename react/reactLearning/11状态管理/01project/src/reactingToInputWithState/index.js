import { useState, useRef, useEffect } from 'react';
import Container from '../components/Container';

function EditableText() {
  const [isEdit, setIsEdit] = useState(false);
  const handleInputBlur = () => {
    setIsEdit(false);
  };
  const handleSpanClick = () => {
    setIsEdit(true);
  };

  const inputRef = useRef(null);
  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  const [inputValue, setInputValue] = useState('测试数据');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div>
        {isEdit ? (
          <input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        ) : (
          <span onClick={handleSpanClick}>{inputValue}</span>
        )}
      </div>
    </>
  );
}

function ReactingToInputWithState() {
  /**
   * 1、确定组件中所有的视图状态
   * 2、确定是什么触发了这些状态的改变
   * 3、通过useState表示内存中的state
   * 4、删减任何不必要的state变量
   * 5、连接事件处理函数来设置state
   */
  return (
    <Container title="用state响应输入">
      <EditableText />
    </Container>
  );
}

export default ReactingToInputWithState;
