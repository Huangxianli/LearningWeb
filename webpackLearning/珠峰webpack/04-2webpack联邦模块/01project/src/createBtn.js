export const createBtn = (btnName) => {
  const btn = document.createElement('button');
  btn.innerHTML = btnName;

  return new Promise((resolve) => {
    btn.addEventListener('click', () => {
      resolve(btn); // 当按钮被点击时，将按钮实例传递给 then 的回调函数
    });
    document.body.appendChild(btn); // 将按钮添加到页面中
  });
};
