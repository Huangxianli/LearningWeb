import { e2 } from './moduleE2.mjs';
console.log('e2', e2);
var e1 = 'e1';
export { e1 };

// var temp = 'temp'; // 注意这两种放置的位置，外部引入文件 default的内筒完全不同，这里是 “temp”
export default temp;
var temp = 'temp'; // 这里是 undefined
