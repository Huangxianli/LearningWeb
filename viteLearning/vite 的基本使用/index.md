- [Vite 的基本使用](#vite-的基本使用)
  - [Vite 的优势](#vite-的优势)
  - [npm 依赖解析与预构建](#npm-依赖解析与预构建)
  - [热模块替换](#热模块替换)
  - [Vite 构建 Vue3 项目](#vite-构建-vue3-项目)
  - [Vite 构建 Vue2 项目](#vite-构建-vue2-项目)
  - [Vite 构建 React 项目](#vite-构建-react-项目)
  - [Vite 中使用 CSS 的各种功能](#vite-中使用-css-的各种功能)
    - [@import alias (命名的映射)](#import-alias-命名的映射)
    - [css-modules](#css-modules)
    - [css-pre-processors （less sass 这些）](#css-pre-processors-less-sass-这些)
    - [禁用 CSS 注入](#禁用-css-注入)
  - [typescript 的集成](#typescript-的集成)
    - [TypeScript 编译器选项](#typescript-编译器选项)
  - [Vite 中处理静态资源的方法](#vite-中处理静态资源的方法)
  - [JOSN](#josn)
  - [Glob 导入](#glob-导入)
    - [多个匹配模式](#多个匹配模式)
    - [反面匹配模式](#反面匹配模式)
    - [具名导入](#具名导入)
    - [自定义查询](#自定义查询)
    - [基础路径](#基础路径)
    - [Glob 导入注意](#glob-导入注意)
  - [动态导入](#动态导入)
  - [eslint \& prittier](#eslint--prittier)
  - [环境变量](#环境变量)
  - [sourceMap](#sourcemap)

# Vite 的基本使用

## Vite 的优势

- 上手简单（没有太多复杂晦涩的配置）
- 开发效率高（编译速度非常快）
- 社区成本低（兼容 rollup 插件）

为什么 Vite 的启动速度很快？

Vite 在一开始就将应用中的模块区分为**依赖**和**源码**两类，改进开发服务器的启动时间

- 依赖，大多为在开发时不会变动的纯 JS，Vite 会使用 esbuild 预构建依赖
- 源码，并非一定是 js 文件，时常会被编辑，但同时，并不是所有的源码都需要被加载。Vite 以原生 ESM 方式提供源码，Vite 只需要在浏览器请求源码时进行转化并按需提供源码，只有当前屏幕上实际使用时才会被处理

1. 非全量编译 Vite 在启动的时候，其实并没有对所有的文件进行编译，访问哪些内容，就去加载编译那些文件
2. Esbuild 本身编译就很快 同时使用了 Esbuild 工具进行编译，本身这个工具进行编译就非常非常的快

Vite1.0 和 Vue3 强绑定，Vite2.0 就开始和框架没有关系了，可以通过插件来构建不同框架的项目

## npm 依赖解析与预构建

```js
import { someMethod } from 'my-dep';
```

像这种 ESM 语法下的裸模块（只有模块名，没有路径信息）的导入，浏览器是不认识的（现代浏览器支持 ESM，但是不认识这种裸模块导入；但如果是 node 环境下会自动的去找 node_modules 里的），会直接报错。Vite 会检测所有被加载源文件的此类的裸模块的导入，并且执行一下操作

1. 预构建，将 CommonJS / UMD 转化成 EMS 模式，由 esbuild 完成，所以速度很快
   > 所有现代的浏览器都支持 es-module，浏览器并不支持 commonjs 模块化；node 模块支持 commonjs 模块化，es-module 现在也已经被 node 非常好的支持了，而且也是官方现代化开发的首选
   > 现在无论是浏览器还是 node 环境，都对 es-module 全面的支持了
2. 重写导入为合法的 URL，例如 `/node_modules/.vite/....`
   > node 环境下，import 一个裸模块，是会自动的去当前文件的目录下查找 node_modules 文件夹下的该模块对应的文件，如果没有找到会向上查找，直到顶级文件夹；但是浏览器环境不会自动的去 node_modules 里面查找，所以需要将路径进行转化

> 注意：Vite 通过 HTTP 头来缓存请求到的依赖，依赖是强缓存

esbuild 预构建依赖
在启动开发服务器时，Vite 会找到所有的第三方**依赖**模块，然后使用 esbuild 将这些零散的第三方模块打包成一个或少数的几个单一的 **ESM** 模块，后面代码中 import 这些依赖的时候，Vite 实际提供的是与构建好的那个大模块

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

create-vite 是创建项目的脚手架 / 初始化工具，vite 是构建工具 / 开发服务器

Vite 项目不支持使用 Vite 进行 eslint 的校验，但是可以通过编辑器（vscode 这些）来校验

Webpack 的编译入口一般是一个 js 文件，将所有的内容编译完才将产物加载到 html 文件中
Vite 的编译入口必须是一个 html 文件，这个和他的编译快是有关的，加载 html 文件，通过 `<script>` 标签会去加载 js 文件，然后在对这个 js 文件进行编译

会自动的下载并引入和使用 `@vitejs/plugin-vue`
但是要注意，这个并不支持 Vue jsx 的写法，要自己额外下载其他的插件 `@vitejs/plugin-vue-jsx`，这个插件也支持 `tsx`
同时在 vite.config.ts 中配置

要注意 ts 的这两个配置

```json
"jsx": "preserve",
"jsxImportSource": "vue", // 会自动导入 Vue 的 JSX 工厂函数和类型，使用 jsx 语法的时候，不会报错 返回值为 any
```

```js
import vueJsx from '@vitejs/plugin-vue-jsx';
export default {
  plugins: [vue(), vueJsx()],
};
```

## Vite 构建 Vue2 项目

在使用 `npm create vite@latest` 的时候 Vue2 的选项并没有出现在列表里面

选择 vanilla 选项（原生的 js）

可以使用 `@vitejs/plugin-vue2` 和 `@vitejs/plugin-vue2-jsx`

> 注意 `@vitejs/plugin-vue2` 插件是和 `vue2.7` 版本绑定了的，只支持 vue2.7 版本，而且这个插件也已经不再维护了，最高支持 `vite6` > `@vitejs/plugin-vue2-jsx` 最高支持 `vite5`

`npm install @vitejs/plugin-vue2 -D`
`npm install @vitejs/plugin-vue2-jsx -D`

<!-- `npm install vue-template-compiler -D` -->

<!-- 注意两个插件的版本要相同 -->

在 vite.config.js 文件中

```js
import { defineConfig } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
import vue2Jsx from '@vitejs/plugin-vue2-jsx';
export default defineConfig({
  plugins: [
    vue2({
      jsx: true, // 如果要支持 jsx，和 vue3 不一样，vue3 还要额外的下载和使用 @vitejs/pulgin-vue-jsx 插件
    }),
    vue2Jsx(),
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js', // 使用包含编译器的版本，不使用这个，就不能使用  template 语法，只有在非 .vue 中使用 template 的时候才需要这样设置 例如如果要在 main.js 中使用 new Vue({ templte: ...}) 就需要这样设置
      // 注意这样会导致打包后的体积大一些
    },
  },
});
```

## Vite 构建 React 项目

`npm create vite@latest` 选择 react 构建

Vite 使用 plugin-react-swc 支持 react 项目
Vite 之前使用 React FastRefresh（@vite/plugin-react-refresh） 支持 react 项目的热更
很早之前 react 是使用 react-hot-leader 进行热更新的

自动的使用 `@vitejs/plugin-react` 或者 `@vitejs/plugin-react-swc`

可以发现 index 文件里面的 script 标签引入的是 mian.jsx 文件，为什么可以生效？？？
Vite 本身会启动一个本地的 server，去获取路径对应的文件，但是在该本地服务中，会编译该文件，虽然后缀的名称是 jsx，但是其中的内容是转化成了 js，当 script 的 type 为 module 时，其实是不关心文件后缀名称的

## Vite 中使用 CSS 的各种功能

导入 .css 文件会把内容插入到 `<style>` 标签中，也有 HMR 支持

推荐使用 原生的 `css variable（css 原生变量）`

内部已经集成了 `postcss` （兼容性处理）
在根目录下创建 `postcss.config.js`
CSS 最小化压缩将会在 postcss 之后运行，并使用 `build.cssTarget` 选项

```js
module.exports = {
  // 这个只是开发调试方便
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

只需要在定义文件的时候 `xxx.module.css` 就会自动的识别为 css-modules

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

如果 css.modules.localsConvention: 'camelCaseOnly' 下划线->小驼峰的格式转化，可以使用按照名称导入

```jsx
// apply_color -> applyColor
import { applyColor } from 'main.module.css';
<>
  <div className={applyColor}></div>
</>;
```

### css-pre-processors （less sass 这些）

在 vite 中是天然支持的，只需要自己下载对应的库就可以

### 禁用 CSS 注入

```js
import './foo.css'; // 这个样式会注入到页面中
import otherStyle from './foo.css?inline'; // 这个样式不会注入到页面中
```

## typescript 的集成

Vite 本身就已经支持了 .ts，开发环境中 Vite 使用的是 esbuild（本身支持 ts 语法），但是要注意 Vite 对 ts _只编译，不校验_，假定类型检查已经被 IDE 处理过了

为什么不放在一起？
编译只需要在每个文件的基础上进行，类型检查就要了解整个模块图。如果将检查加入到 Vite 管道里面，会损害 Vite 的速度优势
Vite 的工作是尽可能的将原模块转化成可以在浏览器中运行的形式

- 构建时校验：在构建的时候生产版本的时候，手动的 `tsc --noEmit` （build: tsc --noEmit && vite build），这样在打包构建的时候，会先去校验 .ts .tsx .js .jsx 内的 ts 是否正确，如果要支持校验 vue 文件中的 ts，要先 `npm install vue-tsc`，同时打包语句加上 `vue-tsc --noEmit &&`
- 开发时校验：在一个单独的进程中 `tsc --noEmit --watch`，也可以直接使用 `vite-plugin-checker`
  新
  > --noEmit 只检查不编译
  > 在开发过程中 将检查和编译分开，检查和编译是两个不同的进程，注意，即使是将检查和编译放在一个进程，也代表检查出了检查出了错误就不能编译

Vite 会是用 `esbuild` 将 ts 文件转义到 js，速度是 tsc 的 20~30 倍。同时 HMR 更新反应到浏览器的事件小于 50ms

### TypeScript 编译器选项

`tsconfig.json` 中的 `complierOptions` 下的一些配置要特别注意

```json
// tsconfig.json
{
  "compilerOptions": {
    "isolatedModules": true // 在 vite 的项目里面都推荐使用，esbuild 只执行没有类型信息的转译，它并不支持某些特性，如 const enum 和隐式类型导入，配置为 true 将部分打包的错误提前到开发阶段
  }
}
```

1. 一个文件中 import 了一个类型，又 export 了一个类型，由于 ts 在编译成 js 的时候，类型是不会保留的，在 export 的时候，这个类型就已经不存在了，所以不能 export 该类型，打包的时候会报错，添加了该配置，提前到开发的时候报错
2. const enum A { First = 0 } 在 Vite 中并不会被编译成一个常量（esbuild 的元婴），所以在使用的时候 A.First A 找不到，添加了该配置会在开发的时候就报错
3. 开启了该配置之后，要求我们的文件每个文件都必须要有 import 或者 export（除了 .d.ts 文件）

```json
{
  "compilerOptions": {
    "useDefineForClassFields": true // 控制类中声明的字段在编译后使用何种方式来初始化
  }
}
```

1. true：使用 Object.defineProperty(this, 'filed', {value: 'initValue', writable: true, configurable: true, enumerable: true}) 来初始化
2. false：使用 this.filed = 来初始化

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["vite/client"] // client types： 告诉我们 vite 的内置的一些变量的类型 import.meta.url 等这些的类型
  }
}
// 或者直接建立一个 .d.ts 文件声明内容为 /// <reference types="vite/client" />
```

1. Asset imports：import 一个静态文件的返回类型，如果没有 client types 就不能 import A from 'xxx.png' ，ts 不认识 png 文件，而且不知道返回的是什么类型
2. env 环境变量（Vite 上注入的常量定义的类型定义） import.meta.env Vite
3. HMR API：import.meta.hot

## Vite 中处理静态资源的方法

像图片这些
会自动打包到 public 文件夹下面

添加一些特殊的查询参数可以改变资源被引入的方式：

1. url import A from 'xxx.png?url' console.log(A) -> 该文件会根据 `build.assetsInlineLimit` 和文件的大写来决定是都被打包成一个静态资源还是内联进去，A 是一个 Data URI 字符串 / 指向文件的路径字符串
2. raw import A from 'xxx.png?raw' console.log(A) -> 整个文件的内容（字符串的形式）（不会打包成静态资源文件）
3. worker/worker inline

对于 json 文件
可以直接 import A from 'xxx.json'，也可以 import {some} from 'xxx.json'

## JOSN

JSON 可以直接导入

```json
"object1": ""
```

```js
import json from './example.json';
import { object1 } from './example.json';
```

## Glob 导入

```js
const modules = import.meta.glob('./dir/*.js');
// 会被转译成，import() 是懒加载的，并作为独立的 chunck
const modules = {
  './dir/a.js': import('./dir/a.js'),
  './dir/b.js': import('./dir/b.js'),
};

const modules = import.meta.glob('./dir/*.js', { eager: true });
// 会被转译成，注意这里不是懒加载
import * as __vite_glob_0_0 from './dir/a.js';
import * as __vite_glob_0_1 from './dir/b.js';
const modules = {
  './dir/a.js': __vite_glob_0_0,
  './dir/b.js': __vite_glob_0_1,
};
```

### 多个匹配模式

```js
const modules = import.meta.glob(['./dir1/*.js', './dir2/*.js']);
```

### 反面匹配模式

```js
const modules = import.meta.glob(['./dir/*.js', '!**/a.js']);
// 排除掉 dir 下的 a.js
```

### 具名导入

```js
const modules = import.meta.glob('./dir/*.js', { import: 'setup' });
// 会转译成
const modules = {
  './dir/a.js': () => import('./dir/a.js').then((res) => res.setup),
  './dir/b.js': () => import('./dir/b.js').then((res) => res.setup),
};

// 还可以结合 eager 一起使用
const modules = import.meta.glab('./dir/*.js', {
  import: 'setup',
  eager: true,
});
// 会转译成
import { setup as __vite_glob_0_0 } from './dir/.a.js';
import { setup as __vite_glob_0_1 } from './dir/.b.js';
const modules = {
  './dir/a.js': __vite_glob_0_0,
  './dir/b.js': __vite_glob_0_1,
};

// 还可以只加载默认导出，只要设置 import: defualt
```

### 自定义查询

可以通过 query 来提供对导入的自定义查询

```js
const modules = import.meta.glob('./dir/*.js', {
  query: '?raw',
  import: 'default',
});
```

还可以自己定义其他的参数给其他的插件使用

### 基础路径

使用 base 参数

```js
// base 只能是相对于 导入文件的目录路径 / 相对于项目根目录的绝对路径，不支持别名和虚拟模块

const modules = import.meta.glob('./**/*.js', { base: './base' });

// 当前文件的同级有 base 文件夹，base 文件夹下有 dir 文件夹，dir 文件夹下有 a.js b.js
const modules = {
  './dir/a.js': () => import('./base/dir/a.js'),
  './dir/b.js': () => import('./base/dir/b.js'),
};
```

### Glob 导入注意

1. 这是 `Vite` 独有的
2. `import.meta.glob` 的所有参数都必须是字面量的方式传入，不能是变量或表达式
3. 该 Glob 模式会被当成导入标识符：必须是相对路径（以 ./ 开头）或绝对路径（以 / 开头，相对于项目根目录解析）或一个别名路径（请看 [resolve.alias](https://cn.vitejs.dev/config/shared-options.html#resolve-alias) 选项）
4. Glob 匹配是使用 [tinyglobby](https://github.com/SuperchupuDev/tinyglobby) 来实现的 —— 阅读它的文档来查阅 [支持的 Glob 模式](https://github.com/mrmlnc/fast-glob#pattern-syntax)

## 动态导入

```js
import() // 注意，import 的路径可以是一个变量，但是赋值的时候，如果值里面有 '/' 会导入失败
```

## eslint & prittier

eslint 代码规范
prittier 格式化

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

## sourceMap

- 开发服务器
  没有 server.sourcemap 选项，默认就是开启且内联的
- 构建 build.sourcemap
  true -> 生成单独的 sourceMap 文件（只在打开开发者工具才会加载）默认值
  inline -> 将 sourceMap 作为 Base64 编码的 Data URI 内联到生成的 js 文件的末尾（随源码一起加载）
  hidden -> 会生成单独的 sourceMap 文件，但是不会在 js 文件的末尾添加引用注释 (//# sourceMappingURL=...)
  false -> 不生成 sourceMap 文件
