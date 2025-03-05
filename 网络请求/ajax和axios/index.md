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
 * 0 刚创建出来
 * 
 * 4 服务器成功给 ajax 响应数据了
 */
console.log(xhr.readyState);

// ajax 状态发生改变触发的事件
xhr.onreadystatechange = function() {
  if (xhr.readyState === 0) {
  } else if (xhr.readyState === 1) {

  }else if (xhr.readyState === 4) {
    xhr.response; // 服务器返回的数据
  }
}

// 配置请求
xhr.open("get", url);

// 发送请求，参数是请求体
xhr.send();
```

## 同源策略
