import { createBtn } from './createBtn';
// import('./bootstrap');

createBtn('project1 按钮').then((res) => {
  console.log('执行了点击事件');
});
const { createDiv } = await import('project2/createDiv');

// 使用示例
createDiv('这是来自project2的div');
