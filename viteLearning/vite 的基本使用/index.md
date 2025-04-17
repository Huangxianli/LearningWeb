# Vite 的基本使用

## Vite 的优势

- 上手简单（没有太多复杂晦涩的配置）
- 开发效率高（编译速度非常快）
- 社区成本低（兼容 rollup 插件）

为什么 Vite 的启动速度很快？

Vite 在启动的时候，其实并没有对多有的文件进行编译，访问哪些内容，就去加载编译那些文件
同时使用了 Esbuild 工具进行编译，本身这个工具进行编译就非常非常的快

## Vite 构建 Vue3 项目

从 Vite2.0 开始，Vite 就是一个夸框架的项目脚手架

`npm create vite@latest`
或者是
`npm create vite@latest my-vue-app -- --template vue`

本质上等同于
`npx create-vite@latest`
`npx create-vite@latest my-vue-app -- --template vue`

Vite 的编译入口必须是一个 html 文件，这个和他的编译快是有关的，加载 html 文件，通过 `<script>` 标签会去加载 js 文件，然后在对这个 js 文件进行编译

会自动的下载并引入和使用 `@vitejs/plugin-vue`
但是要注意，这个并不支持 Vue jsx 的写法，要自己额外下载其他的插件 `@vitejs/plugin-vue-jsx`

## Vite 构建 Vue2 项目

在使用 `npm create vite@latest` 的时候 Vue2 的选项并没有出现在列表里面

选择 vanilla 选项（原生的 js）

可以使用 `@vitejs/plugin-vue2`
`npm install @vitejs/plugin-vue2 -D`
`npm install vue-template-compiler -D`
注意两个插件的版本要相同

在 vite.config.js 文件中

```js
import { defineConfig } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
export default defineConfig({
  plugins: [vue2()],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js', // 使用包含编译器的版本，不适用这个，就不能使用  template 语法
    },
  },
});
```

## Vite 构建 React 项目

`npm create vite@latest` 选择 react 构建

自动的使用 `@vitejs/plugin-react` 或者 `@vitejs/plugin-react-swc`

## Vite 中使用 CSS 的各种功能

推荐使用 原生的 `css variable（css 原生变量）`

内部已经集成了`postsss`
在根目录下创建 `postcss.config.js`

```js
module.exports = {
  // pulgins: [require('@postcss-plugins/console')],s
};
```

### @import alias (命名的映射)

在 `vite.config.js` 中

```js
export default defineConfig({
  resolve: {
    alias: {
      '@styles': '/src/styles', // 配置别，注意要加 / （表示根目录），在使用的时候也要加 import "@styles/index.css"
    },
  },
});
```

### css-modules

只需要在定义类文件的时候 `xxx.module.css` 就会自动的识别为 css-modules

使用

```css
/* main.module.css */
class1 {
  color: red;
}
```

```jsx
import className1 from 'main.module.css';
<>
  <div className={className1.class}></div>
</>;
```

### css-pre-processors （less sass 这些）

在 vite 中是天然支持的，只需要自己下载对应的库就可以
