## ajax
全称为 Asynchronous JavaScript And XML 异步的 JS 和 XML
可以使用 JSON XML HTML 和 text 文本 等格式发送和收集数据
AJAX 不是新的编程语言，是一种将现有的标准组合在一起使用的新方式

## ajax 发送请求的经典步骤
1. 创建网络请求 ajax 对象（使用 XMLHttpRequest）
2. 监听 XMLHttpRequest 对象状态的变化，或者监听 onload 事件（请求完成时触发）
3. 配置网络请求（通过 open 方法）
4. 通过 send 网络请求

```js
const xhr = new XMLHttpRequest();
console.log(xhr);
xhr.readyState; // 表示 ajax 的状态
/**
 * 0 刚创建出来，还没有调用 open 方法
 * 1 调用了 open 方法，但是还没有调用 send 方法
 * 2 已经调用了 send 方法，而且服务器已经返回响应头，这个时候可以获取到响应头了
 * 3 正在接收响应体的数据（如果是接收一个稍微大一点的文件可以使用到这个数字）
 * 4 服务器成功给 ajax 响应完数据了
 */
console.log(xhr.readyState);

// ajax 状态发生改变触发的事件
xhr.onreadystatechange = function() {
  if (xhr.readyState === 0) {
    // 刚 new 出来 XMLHttpRequest 
  } else if (xhr.readyState === 1) {
    // 配置好了 open
  } else if (xhr.readyState === 2) {
    // 调用了 send 方法，而且服务器已经返回响应头了
  } else if (xhr.readyState === 3) {
    // 正在接收响应体的数据
  } else if (xhr.readyState === 4) {
    xhr.response; // 服务器返回的数据
  }
}

// 配置请求
xhr.open("get", url);

// 发送请求，参数是请求体
xhr.send();
```

## 同源策略
浏览器的安全策略

源 = 协议 + 域名 + 端口

只允许访问与当前页面相同源的资源

但是可以通过后端做一些设置，即使不同源也可以被访问
koa-cors 包

```js
const cors = require('koa2-cors');
app.use(cors());
```

## xhr 的 load 事件

```js
const xhr = new XMLHttpRequest();
// 监听 ajax 状态的变化
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    // 请求成功
    console.log(2);
  }
};
// 当服务器已经将数据给了 ajax 就会触发
xhr.onload= function () {
  console.log(1);
};

xhr.open('get', 'http://localhost:300/get');
xhr.send();

// 先输出 2 再输出 1
```

## 后端给前端 json 数据
Content-Type: application/json
需要将 json 串转化成对象使用
后者设置 xhr.responseType = 'json' 这样就会自动的将返回的 json 转化成对象
```js
xhr.onload = function () {
  JSON.parse(xhr.response);
}

// or 
xhr.responseType = 'json';
```

## 后端给前端 xml 数据
Content-Type: application/xml

通过 xhr.responseXML 获取 后端返回的 XML 数据


## 后端响应不同的状态码
| 状态 | 信息                                                 |
| ---- | ---------------------------------------------------- |
| 200  | 请求成功                                             |
| 201  | POST 请求，创建新的资源                              |
| 301  | 请求资源的 URL 已经修改，响应中会给出新的 URL        |
| 400  | 客户端的错误，服务器无法或者不进行处理               |
| 401  | 未授权的错误，必须携带请求的身份信息                 |
| 403  | 客户端没有访问权限，被拒绝                           |
| 404  | 服务器找不到资源                                     |
| 500  | 服务器遇到了不知道如何处理的情况                     |
| 503  | 服务器不可用，可能处于维护或者重载状态，暂时无法使用 |

xhr.status 可以获取到 httpCode 


## get 传参
xhr.open('get', 'xxx?key=id&&key=id')

## post 传递 urlencodeed 数据
## post 传递 json 数据
## post 传递 formData 数据
## 传递多种形式的参数
## 超时处理和自动取消请求
