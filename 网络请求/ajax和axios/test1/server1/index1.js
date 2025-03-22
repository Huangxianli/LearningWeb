const Koa = require('koa');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const Router = require('@koa/router');
const { koaBody } = require('koa-body');

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(logger());
app.use(koaBody());

// 定义 GET 路由
router.get('/get', (ctx) => {
  ctx.status = 200;
  ctx.body = 'hello';
});
router.get('/getjson', ctx => {
  ctx.query; // 前端传递过来的参数

  ctx.status = 200;
  ctx.type = "json";
  ctx.body = {
    name: 'name',
    age: 'age',
  };
});

router.get('/get/:id', ctx => {
  ctx.params; // 前端传过来的 { id }
})
router.get('/getxml', ctx => {
  ctx.status = 200;
  ctx.type = "xml";
  ctx.body = `<div>test<div>`;
});

// 注册路由中间件
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务器
const port = 5500;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
app.on('error', (err, ctx) => {
  console.error('server error', err);
});