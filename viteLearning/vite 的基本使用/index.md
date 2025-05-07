# Vite 的基本使用

## Vite 的优势

- 上手简单（没有太多复杂晦涩的配置）
- 开发效率高（编译速度非常快）
- 社区成本低（兼容 rollup 插件）

为什么 Vite 的启动速度很快？

Vite 在启动的时候，其实并没有对所有的文件进行编译，访问哪些内容，就去加载编译那些文件
同时使用了 Esbuild 工具进行编译，本身这个工具进行编译就非常非常的快

Vite1.0 和 Vue3 强绑定，Vite2.0 就开始和框架没有关系了，可以通过插件来构建不同框架的项目

## npm 依赖解析与预构建

```js
import { someMethod } from 'my-dep';
```

像这种裸模块的导入，浏览器是不认识的，会直接报错。Vite 会检测所有被加载源文件的此类的裸模块的导入，并且执行一下操作

1. 预构建，将 CommonJS / UMD 转化成 EMS 模式，由 esbuild 完成，所以速度很快
2. 重写导入为合法的 URL，例如 `/node_modules/.vite/....`

> 注意：Vite 通过 HTTP 头来缓存请求到的依赖，依赖是强缓存

## 热模块替换

Vite 提供了原生的 ESM 的 HRM AIP，Vite 内置了 HMR 到 VUE 的 SFC 和 React Fast Refresh 中
如果是使用 create-vite 创建的应用，所选的模板已经预先配置了这些

## Vite 构建 Vue3 项目

从 Vite2.0 开始，Vite 就是一个跨框架的项目脚手架，不再和 Vue3 进行强绑定，可以使用 Vite 来构建其他框架的项目

`npm create vite@latest`
或者是
`npm create vite@latest my-vue-app -- --template vue`

本质上等同于
`npx create-vite@latest`
`npx create-vite@latest my-vue-app -- --template vue`

Vite 项目不支持使用 Vite 进行 eslint 的校验，但是可以通过编辑器来校验

Webpack 的编译入口一般是一个 js 文件，将所有的内容编译完才将产物加载到 html 文件中
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
      vue: 'vue/dist/vue.esm.js', // 使用包含编译器的版本，不使用这个，就不能使用  template 语法
    },
  },
});
```

## Vite 构建 React 项目

`npm create vite@latest` 选择 react 构建

Vite 使用 plugin-react-swc 支持 react 项目
Vite 之前使用 React FastRefresh（@vite/plugin-react-refresh） 支持 react 项目的热更新
很早之前 react 是使用 react-hot-leader 进行热更新的

自动的使用 `@vitejs/plugin-react` 或者 `@vitejs/plugin-react-swc`

可以发现 index 文件里面的 script 标签引入的是 mian.jsx 文件，为什么可以生效？？？
Vite 本身会启动一个本地的 server，去获取路径对应的文件，但是在该本地服务中，会编译该文件，虽然后缀的名称是 jsx，但是其中的内容是转化成了 js，当 script 的 type 为 module 时，其实是不关心文件后缀名称的

## Vite 中使用 CSS 的各种功能

推荐使用 原生的 `css variable（css 原生变量）`

内部已经集成了 `postsss` （兼容性处理）
在根目录下创建 `postcss.config.js`

```js
module.exports = {
  // pulgins: [require('@postcss-plugins/console')], // 在编译 css 文件的时候进行输出
};
```

```css
.root {
  @console.error hello root
  color: red;
}
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

```css
@import url('@styles/....css');
```

### css-modules

只需要在定义类文件的时候 `xxx.module.css` 就会自动的识别为 css-modules

```css
/* main.module.css */
class1 {
  color: red;
}
```

```jsx
import className1 from 'main.module.css';
<>
  <div className={className1.class1}></div>
</>;
```

### css-pre-processors （less sass 这些）

在 vite 中是天然支持的，只需要自己下载对应的库就可以

## typescript 的集成

Vite 本身就已经支持了 ts，开发环境中 Vite 使用的是 esbuild（本身支持 ts 语法），但是要注意 Vite 对 ts _只编译，不校验_
为什么不放在一起？
编译只需要在每个文件的基础上进行，类型检查就要了解整个模块图。如果讲检查加入到 Vite 管道里面，会损害 Vite 的速度优势

- 构建时校验：在构建的时候生产版本的时候，手动的 `tsc --noEmit` （build: tsc --noEmit && vite build），这样在打包构建的时候，会先去校验 ts 是否正确，如果要支持校验 vue 文件中的 ts，要先 `npm install vue-tsc`，同时打包语句加上 `vue-tsc --noEmit &&`
- 开发时校验：在一个单独的进程中 `tsc --noEmit --watch`，也可以直接使用 `vite-plugin-checker`

```json
// tsconfig.json
{
  "compilerOption": {
    "isolatedModules": true // 在 vite 的项目里面都推荐使用，将部分打包的错误提前到开发阶段
  }
}
```

1. 一个文件中 import 了一个类型，又 export 了一个类型，由于 ts 在编译成 js 的时候，类型是不会保留的，在 export 的时候，这个类型就已经不存在了，所以不能 export 该类型，打包的时候会报错，添加了该配置，提前到开发的时候报错
2. const enum A { First = 0 } 在 Vite 中并不会被编译成一个常量（esbuild 的元婴），所以在使用的时候 A.First A 找不到，添加了该配置会在开发的时候就报错
3. 开启了该配置之后，要求我们的文件每个文件都必须要有 import 或者 export

```json
// tsconfig.json
{
  "compilerOption": {
    "types": ["vite/client"] // client types： 告诉我们 vite 的内置的一些变量的类型 import.meta.url 等这些的类型
  }
}
```

1. Asset imports：import 一个静态文件的返回类型，如果没有 client types 将不能 import A from 'xxx.png' ts 不认识 png 文件，而且不知道返回的是什么类型
2. env 环境变量
3. HMR API：import.meta.hot

## Vite 中处理静态资源的方法

像图片这些
会自动大打包到 public 文件夹下面

1. url import A from 'xxx.png?url' console.log(A) -> 返回的是一个路径
2. raw import A from 'xxx.png?raw' console.log(A) -> 整个文件的内容（字符串的形式）
3. worker/worker inline

对于 json 文件
可以直接 import A from 'xxx.json'，也可以 import {some} from 'xxx.json'

## eslint & pritter

eslint 代码规范
pritter 格式化

在根目录下创建文件 .eslintrc.js

```js
module.exports = {
  extends: '',
};
```

创建文件 .prettierrc vscode 也要安装插件

```js
{
}
```

vscode 设置 formate on save 勾选，default formatter 选择 pretty

## 环境变量

import.mate.env（生产环境，在打包的时候，就会将 import.mate.env 直接替换成一个具体的对象）

- MODE
- BASE_URL
- PROD
- DEV
- SSR

自定义的 env
在根目录下创建 .env 文件，可以自己设置

```
VITE_TTILE = Hello
// 一定要使用 VITE 开头
```

import.mate.env.VITE_TITLE

.env.production
.env.development
.env.development.local
