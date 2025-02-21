# Loader
## loader 原理
loader 帮助 webpack 将不同类型的文件转化为 webpack 可以识别的模块
## Loader 执行顺序
1. pre：前置 loader
2. normal：普通 loader
3. inline：内联 loader
4. post：后置 loader
5. 如果是同类型的 loader，是从右到左，从下到上执行的

```js
module: {
  rules: [
    {
      test:/\.js$/,
      loader: 'loader1',
      enforce: 'pre', // 默认是 normal
    }，
    {
      test:/\.js$/,
      loader: 'loader2',
      enforce: 'post',
    }
  ]
  // 按照书写顺序本来应该是 loader2 优先于 loader1 执行，但是由于 loader1 的 enforce 是 pre，所以 loader1 会优先于 loader2 执行
}

inline loader 的使用方法
在文件中
import AA from 'loader1!laoder2?arguments!./a.css';
使用 loader1 和 loader2 处理 a.css 文件，同时向 loader2 中传入参数 arguments

跳过 loader
最前面加 
! 跳过 normal loader
-! 跳过 pre 和 normal
!! 跳过 pre normal post
```
## 开发一个简单的 loader
每一个 loader 都是一个函数，接收一些内容（一般是整个文件内容），返回一些内容

```js
module.exports = function(content, map, meta) {
  // map 和 sourcemap 有关，meta 是其他的 loader 传递的数据 
  return content;
}
```
如何使用:
```js
modules: {
  rules: [
    {
      test: /\.js$/,
      loader: './loaders/myloader.js',
    }
  ]
}
```

## Loader 的分类
### 同步 Loader
有两种写法
```js
module.exports = function(content, map, meta) {
  return content;
}
module.exports = function(content, map, meta) {
  /**
   * 第一个参数：错误信息，如果没有就传 null
   * 第二个参数：处理之后的内容
   * 第三个参数：sourcemap 
   * 第四个参数：传递给下一个 loader 的参数
   */
  this.callback(null, content, map, meta);
}
```
### 异步 Loader
```js
module.exports = function(content, map, meta) {
  const callback = this.async();
  setTimeout(()=> {
    callback(null, content, map, meta)
  });
}


```

### Raw Loader
raw loader 接收到的 content 是 buffer（二进制） 数据
```js
module.exports = function(content, map, meta) {
  // 内部可以是异步也可以是同步，只要对应异步和同步的写法就可以
}
module.exports.raw = true;
```

### Pitching Loader
添加一个 pitch 方法，执行 loader 如果是按照 loader3、loader2、loader1 的顺序执行，那么在执行 loader 之前会先按照顺序执行 pitch1、pitch2、pitch3 然后再开始执行 loader ，如果 pitch 函数中有 return，如果是从 pitch2 中 return 的，那么就是只会执行 pitch1、pitch2、loader1，其他的 pitch 和 loader 就不执行了
```js
module.exports = function() {}
module.exports.pitch = function(remainingRequest) {
  // remainingRequest：剩下还需要处理的 loader
}
```

### this.getOptions()
```js
const options = this.getOptions({
  "type": "object",
  "properties": {
    "property1": {
      "type": "string"
    }
  },
  "additionalProperties": false
});
```