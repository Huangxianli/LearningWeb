export { A } from './moduleA';
/* 
可以简单理解为
import { A } from './moduleA';
export { A };
但是实际上并没有被导入，只是转发了 A 接口，在该模块中不能使用 A
 */

export * from './moduleA';
export { A as moduleA_A } from './moduleA';
// export { default } from './moduleA';

export { A as default } from './moduleA';
/*
相当于
import { A } from './moduleA'; 
export default A;
 */

export { default as B } from './moduleA';
/* 
import B from './moduleA';
export { B };
 */

export * as all from './moduleA';
/* 
import * as all from './moduleA';
export { all };
 */