const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get();

app.listen(3000, () => {
  console.log('启动了服务器 http://localhost:3000');
});
