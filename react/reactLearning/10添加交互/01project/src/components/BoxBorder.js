import { useState } from 'react';
import './boxBorder.css';

function BoxBorder({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="box-border">
        <div className="title-class">
          <span>{title}</span>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? '收起' : '展开'}
          </button>
        </div>
        <div className={!isOpen ? 'hidden-conten' : ''}>{children}</div>
      </div>
    </>
  );
}
export default BoxBorder;
