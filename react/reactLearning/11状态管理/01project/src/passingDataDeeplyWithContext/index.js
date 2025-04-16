/* 使用 context 深层传递参数 */
import Container from '../components/Container';
import { LevelContext } from './levelContext';

import React, { useContext } from 'react';

/**
 * 数据往内传递的过程中，如果跨越多层，通过 props 会显得很繁琐
 * 使用 context 传递
 */

/**
 *
 * 1、创建 context
 * 2、在需要数据的组件内使用创建好了的 context
 * 3、在指定数据的组件中提供这 个context <MyContext.Provider value={} >
 */

/* 使用 context 之前先尝试使用传递 props 或者将 JSX 作为 children 传递 */

function DeepingDatatDeeplyWithContext() {
  return (
    <>
      <Container title="使用context深层传递参数">
        <Section>
          <SectionContent>
            <span>12312</span>
          </SectionContent>
          <Section>
            <SectionContent>12312</SectionContent>
            <Section>
              <SectionContent>12312</SectionContent>
            </Section>
          </Section>
        </Section>
      </Container>
    </>
  );
}

function Section({ children }) {
  const level = useContext(LevelContext); // 第一次使用的时候 <LevelContext.Provider> 没有写，这个时候，会使用 creatContext(initValue) 的 initValue 值；如果其祖先中使用了 <LevelContext.Provider></LevelContext.Provider> 那么获取的就不会是 initValue，无论是否使用 value prop
  return (
    <>
      <div style={{ border: '1px solid red' }}>
        <LevelContext.Provider value={level + 1}>
          <div>{children}</div>
        </LevelContext.Provider>
      </div>
    </>
  );
}

function SectionContent({ children }) {
  const level = useContext(LevelContext);
  // switch (level) {
  //   case 1: {
  //     return <h1>{children}</h1>;
  //   }
  //   case 2: {
  //     return <h2>{children}</h2>;
  //   }
  //   case 3: {
  //     return <h3>{children}</h3>;
  //   }
  //   case 4: {
  //     return <h4>{children}</h4>;
  //   }
  //   case 5: {
  //     return <h5>{children}</h5>;
  //   }
  //   default: {
  //     return <h6>{children}</h6>;
  //   }
  // }
  return React.createElement(
    `h${level && level < 6 ? level : 6}`,
    null,
    children
  );
}
export default DeepingDatatDeeplyWithContext;
