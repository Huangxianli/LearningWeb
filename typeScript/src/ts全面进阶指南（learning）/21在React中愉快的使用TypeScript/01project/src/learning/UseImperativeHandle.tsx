import { useRef, useImperativeHandle } from 'react';
import type { Ref } from 'react';

interface InputRef {
  focus: () => void;
}
export default function UseImperativeHande() {
  const inputRef = useRef<InputRef>(null);
  return <MyComponent ref={inputRef} />;
}

interface MyComponentProps {
  ref?: Ref<InputRef>;
}
function MyComponent({ ref }: MyComponentProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle<InputRef, InputRef>(
    ref,
    () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }),
    []
  );

  return (
    <div>
      <input type="text" ref={inputRef} />
    </div>
  );
}
