# css 变量

```css
:root {
  --base-background-color: green;
  /* 变量值带单位，不能写成字符串的形式  */
  /* --base-font-size: '12px'; */
  --base-font-size: 12px;
}

body {
  background-color: var(--base-background-color, red);
  /* 如果没有定义 --base-background-color 变量，就会使用 备选值 red */
}
```

```js
const rootElement = document.documentElement;

// 获取在 root 上的值
const rootStyle = getComputedStyle(rootElement); // 可以获取非内联的样式（包括内联的）
const baseBackgroundColor = rootStyle.getPropertyValue(
  '--base-background-color'
);

// 设置
rootElement.style.setProperty('--base-background-color', 'red');
```
