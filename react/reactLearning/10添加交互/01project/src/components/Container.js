import { useState } from 'react';

import './container.css';

function Container({ title, children, isOpenDefault }) {
  const [isOpen, setIsOpen] = useState(false || isOpenDefault);

  function handlerClick() {
    setIsOpen(!isOpen);
  }
  return (
    <div className="container-box">
      <h2>{title}</h2>
      <button onClick={handlerClick}>{isOpen ? '收起' : '展开'}</button>
      <hr></hr>
      <div className={!isOpen ? 'hidden-div' : ''}>{children}</div>
    </div>
  );
}
export default Container;
