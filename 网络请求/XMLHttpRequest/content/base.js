// https://www.w3docs.com/learn-javascript/xmlhttprequest.html

/**
 * XMLHttpRequest（XHR）
 * XHQ对象用于与服务器交互
 * 不刷新页面请求特定的URL获取数据
 * 可以用于任意的数据类型，不进仅仅是XML。甚至不单单支持HTTP协议
 */

function test1 () {
  const reqObj = new XMLHttpRequest();
  // open(method, url, ?async, ?user, ?password); 调用请求
  reqObj.open('GET', 'http://www.example.org/example.txt');
  // send('param1=value1&param2=value2'); 将请求发送到服务器
  reqObj.send();
  reqObj.readyState; // 存贮者XMLHttpRequest的状态
  // 当readyState属性更改的时候，会触发onreadystatechange事件
  /**
   * 0 unsent
   * 1 open
   * 2 headers_received
   * 3 loading
   * 4 done
   */
  reqObj.onreadystatechange = function () { };

  // 请求完成后会激发load事件
  reqObj.onload = function () { };
  // onerror事件在网络错误时触发
  reqObj.onerror = function (error) { };
};
test1();