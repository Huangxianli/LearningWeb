import { useState } from 'react';
import type {
  MouseEvent,
  ChangeEvent,
  KeyboardEvent,
  FormEvent,
  FocusEvent,
  UIEvent,
  SyntheticEvent,
  MouseEventHandler,
  ChangeEventHandler,
  KeyboardEventHandler,
  FormEventHandler,
  FocusEventHandler,
  UIEventHandler,
} from 'react';
export default function EventType() {
  return (
    <>
      <MouseEventComponent />
      <ChangeEventComponent />
      <KeyboardEventComponent />
      <FromEventComponent />
      <FoucsEventComponent />
      <UIEventComponent />
      <SyntheticEventComponent />
    </>
  );
}

function MouseEventComponent() {
  const [count, setCount] = useState<number>(0);
  const addHandle: MouseEventHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e;
    setCount(count + 1);
  };
  return (
    <>
      <div>{count}</div>
      <button onClick={addHandle}>增加</button>
    </>
  );
}

function ChangeEventComponent() {
  const [inputValue, setInputValue] = useState<string>('');
  const changeHandle: ChangeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <input type="text" value={inputValue} onChange={changeHandle} />
    </div>
  );
}

function KeyboardEventComponent() {
  const enterHandle: KeyboardEventHandler = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    // 处理中文输入法
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      console.log('按下了回车键');
    }
  };
  return (
    <div>
      <input type="text" onKeyUp={enterHandle} />
    </div>
  );
}

function FromEventComponent() {
  const submitHandle: FormEventHandler = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={submitHandle}>
        <input type="text" />
        <button type="submit">提交</button>
      </form>
    </div>
  );
}

function FoucsEventComponent() {
  const focusHandle: FocusEventHandler<HTMLInputElement> = (
    e: FocusEvent<HTMLInputElement>
  ) => {
    console.log(e.target.tagName);
  };
  return (
    <div>
      <input onFocus={focusHandle} />
    </div>
  );
}

function UIEventComponent() {
  const scrollHandle: UIEventHandler<HTMLDivElement> = (
    e: UIEvent<HTMLDivElement>
  ) => {
    console.log(e);
  };
  return (
    <div style={{ height: '200px' }} onScroll={scrollHandle}>
      <div style={{ height: '900px' }}></div>
    </div>
  );
}

function SyntheticEventComponent() {
  const blurHandle = (
    e: SyntheticEvent<HTMLInputElement, globalThis.FocusEvent>
  ) => {
    console.log(e);
  };
  return (
    <div>
      <input type="text" onBlur={blurHandle} />
    </div>
  );
}
