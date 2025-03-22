# Fetch
JavaScript 使用 fetch 可以发送请求到服务器

fetch() 方法是现代浏览器通用的方法

```js
cosnt promise1 = fetch(url, [options]); 
// fetch 方法返回一个 promise 实例，options 如果不传的话，就是一个 get 请求
```

## fetch 的基本认知
fetch 内部使用 Promise 的方式来处理数据

+ 更简洁
+ 模块话设计，API 分散与多个对象中
+ 通过数据流（Stream 对象处理数据），可以分块读取，有利于提高网站性能，对于大文件或者网速慢的场景很有用

## fetch 如何使用
可以参考阮一峰和 mdn 

### 发送 get 请求
```js
fetch('http://ajax-base-api-t.itheima.net/api/getbooks')
.then(res => {
  console.log(res);
  // res 是一个 Response 对象，需要通过特性的方法获取其中的内容

  console.log(res.json()); // 先转化成 JSON 对象，注意 .json() 是一个异步操作，返回的是一个 promise 对象（Stream 对象）

  return res.json();
}).then(res => {
  // 这个时候的 res 才是最终的值
  console.log(res);
}).catch(err => {
  console.log(err);
});

async function getData () {
  try {
    const response = await fetch('http://ajax-base-api-t.itheima.net/api/getbooks');
    const res = await response.json();
    console.log(res);
  } cactch(err) {
    console.log(err);
  }
};
getData();

// fetch(url);
// 如果要添加查询参数的话，向 url 中拼接 ?param1=value1&param2=value2...
```

### Response 对象
fetch 请求成功之后，返回一个 Response 对象，它是对应服务器的 HTTP 响应

```js
fetch('http://ajax-base-api-t.itheima.net/api/getbooks').then(response => {
  response.status
  response.statusText
  response.ok
  response.headers
  response.body
  response.type
  response.url
})
```

### post 请求
```js
fetch(url, options?)
options: {
  method: 'post',
  headers: {
    'Content-Type': 'apaplication/json', // application/x-form-urlencoded;charset=UTF-8
  },
  body: JSON.stringify(data),
}
```