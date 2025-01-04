let f = 1;
setTimeout(() => { f = [2] }, 2000);
let f1 = 1;
setTimeout(() => { f1 = 2 }, 2000);
export default f1;
export { f };