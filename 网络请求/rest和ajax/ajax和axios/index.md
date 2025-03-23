## ajax

向服务器发送请求
异步 js 和 xml： 是一种基于现有 Web 标准的技术组合（基于现有方 Web 标准的实践方法），核心目标是**实现网页局部更新**
a：async
j：javaScript
a：and
x：xml（早期的数据格式 `<student><name>name1</name></student>`）

cooike 是由服务器发送到用户浏览器并保存在本地的一小块数据。浏览器会存储 cookie 并在下一次向同一服务器再发起请求时携带到服务器上，通常他告知服务器两个请求是否来自同一个浏览器————如保持用户的登录状态

sessionStorage 中存储的数据，在网页关闭的时候就会丢失，只在当前页面有效，哪怕是两个完全一样的网址页面，都不能通用
sessionStorage.setItem("key", "value");
.getItem("key");
.removeItem("key");
.clear();

localStorage 中存储的数据，不自己清空就不会丢失（所有同源页面共享数据）
和 sessionStorage 相同的 api

## axios

基于 promise 的网络请求库，兼容了 node.js 和浏览器，同一条代码即可以在浏览器中运行又可以在 node.js 中运行。node.js 中使用原生的 http 模块，在浏览器中使用的是 XMLHttpRequest

### get 请求

```js
axios.get();
```
