import { D_A } from './moduleD.js';
console.log(`moduleD_1-D_A：${D_A}`);
setTimeout(() => {
  console.log(`moduleD_1-D_A：${D_A}`);
}, 5000);

export { D_A };