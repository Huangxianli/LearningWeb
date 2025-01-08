# XMLHttpRequest
XMLHttpRequest 是一个内建的浏览器对象，允许使用 JavaScript 发送 HTTP 请求

## XMLHttpRequest 基础
有两种模式：
+ synchronous（同步）
+ asynchronous（异步）

具体步骤：
1. 创建一个 XMLHttpRequest 对象
   ```js
   const xhr = new XMLHttpRequest();
   ```
2. 初始化
   ```js
   xhr.open(method, url, [async（不设置成 false，就是异步的）, user, password]);
   ```
   open 是用来配置的，并没有发生实际的请求
3. 发送请求
   ```js
   xhr.send([body]); // body 在有些请求里面是没有的
   ```
4. 监听 xhr 事件以获取响应
   最常用的四个事件：
   + load：请求完成（即使 HTTP 的状态为 400 或 500 等），并且响应已经完全下载
   + error：当无法发出请求，例如网络中断或者无效的 url
   + progress：在下载响应期间定期的触发
   + onreadystatechange：状态（readyState）发生改变的时候触发
   ```js
   xhr.onload = function () {
    if (xhr.status === 200) {
      // httpcode 为 200 的时候
      respones = xhr.response || xhr.responseText
    } else {
    }
   };

   xhr.onerror = function () {
    // 发送请求连接失败的时候
   };

   xhr.onprogress = function (event) {

   }

   xhr.onreadystatechange = function () {
    if (xhr.readyState === 0) { // 0（未初始化） 1（open 被调用） 2（接收到 response header） 3（响应正在被加载） 4（请求完成）

    }
   }
   ```

## 响应相关属性
```js
xhr.timeout = 3000; // 设置请求超时
xhr.response || xhr.responseText; // 读取响应数据
xhr.responseType = 'json'; // 设置响应格式
// '' 'text' 'arraybuffer' 'blob' 'document' 'json'
xhr.readyState
// 0（未开始） 1（open 开始执行） 2（接收到响应 header） 3（正在下载中） 4（完成）
xhr.abort(); // 终止请求
```

## 同步请求
设置 open 的第三个属性为 false，就是设置成了同步请求
设置成了同步请求之后，当一开始调用 send() 的时候，后面的代码会暂停执行，接收到响应之后才恢复执行
```js
xhr.open(method, url, false); // 设置成同步请求

try {
  xhr.send(); // 这里就会中断执行后面的代码
  doSomething();
  if (xhr.status == 200) {

  }
} catch (error) {
  // 替代 onerror 事件
} 
```

## HTTP-header
+ setRequestHeader(name, value) 使用给定的 name 和 value 设置 request header；重复设置会叠加而不是覆盖
+ getResponseHeader(name) 获取具有给定 name 的 header（Set-Cookie 和 Set-Cookie2 除外）
+ getAllResponseHeaders() 返回除 Set-Cookie 和 Set-Cookie2 外的所有 response header

## 跨域
xhr.withCredentials = true;

