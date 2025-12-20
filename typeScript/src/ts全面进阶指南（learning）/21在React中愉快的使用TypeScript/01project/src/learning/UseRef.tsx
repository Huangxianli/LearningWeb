import { useRef } from 'react';
export default function UseRef() {
  const valueRef = useRef(0);
  valueRef; // React.RefObject<number>
  valueRef.current = 12;

  const valueRef1 = useRef<number>(1);
  valueRef1; // React.RefObject<number>

  const divRef = useRef(null);
  divRef; // React.RefObject<null>

  const divRef1 = useRef<HTMLDivElement>(null);
  divRef1; // React.RefObject<HTMLDivElement | null>
  return (
    <div ref={divRef}>
      <div ref={divRef1}>useRef</div>
    </div>
  );
}
