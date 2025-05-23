## MVC

传统的服务器：

- Model 数据模型
- View 数据模型
- Controller 控制器，负责加载数据并选择视图来呈现数据

传统的服务器都是直接给客户端返回一个页面（前后端不分离）
为什么不再适用了：
一个应用可能存在多个客户端（web 端、小程序、app），由于返回的是一个页面，只能提供给 web 端使用

## rest

REpresentational State Transfer（表示层（视图）状态（数据）的传输）
rest 其实一种服务器的设计风格
主要的特点是：服务器只返回数据
服务器和客户端传输数据通常是使用 JSON 格式（小）
请求的方法：（rest 的请求方法是基于 HTTP 协议设计的）（其实只是建议，并不是一定要按照这个来）

- GET 获取数据
- POST 新建或添加数据（多次请求可能创建多个资源）
- PUT 覆盖式的更新资源的全部属性（多次的更新结果一致）
- PATCH 修改数据（更新部分资源，修改指定的字段）
- DELETE 删除数据
- OPTION 由浏览器自动发送，检查请求的一些权限，查询服务器支持的请求方法，用于跨域请求预检（CORS）
- HEADS 获取资源的元数据（如响应头），不返回消息体，用于验证资源是否存在或者缓存验证
