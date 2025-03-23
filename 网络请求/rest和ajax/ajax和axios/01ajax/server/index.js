const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
};

app.use((req, res, next) => {
  // 允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  // 添加预检请求的缓存时间
  res.setHeader('Access-Control-Max-Age', '86400');
  // 允许发送身份凭证（如 cookies）
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // 处理 OPTIONS 预检请求
  // if (req.method === 'OPTIONS') {
  //   res.status(200).end();
  //   return;
  // }
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const fullFilePath = (filename) => {
  return path.resolve(__dirname, `../data/${filename}`);
};

const dataFilePath = fullFilePath('data.json');

const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, fileData) => {
      if (err) {
        return reject(err);
      }
      return resolve(JSON.parse(fileData || '[]'));
    });
  });
};
const writeFile = (filePath, fileData) => {
  const data =
    typeof fileData === 'string' ? fileData : JSON.stringify(fileData);
  console.log(1231);
  return new Promise((resolve, reject) => {
    fs.writeFile(
      filePath,
      data,
      { encoding: 'utf-8', mode: 438, flag: 'w' },
      (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      }
    );
  });
};

const sendSuccessResult = (res, resultData) => {
  res.send({
    status: 'ok',
    code: HTTP_STATUS.OK,
    data: resultData,
  });
};
const sendErrorResult = (res, code, errorInfo) => {
  res.status(code).json({
    status: 'error',
    code,
    data: errorInfo,
  });
};

app.get('/student', async (req, res) => {
  try {
    const data = await readFile(dataFilePath);
    sendSuccessResult(res, data);
  } catch (err) {
    sendErrorResult(res, HTTP_STATUS.SERVER_ERROR, err);
  }
});

app.post('/student', async (req, res) => {
  try {
    const { name, age, gender, address } = req.body;
    console.log(1);
    const data = await readFile(dataFilePath);
    data.push({
      name,
      age,
      gender,
      address,
      id: (data[data.length - 1]?.id ?? 0) + 1,
    });
    await writeFile(dataFilePath, data);
    console.log(222);
    sendSuccessResult(res, data);
  } catch (err) {
    sendErrorResult(res, HTTP_STATUS.SERVER_ERROR, err);
  }
});

app.listen(3000, () => {
  console.log('启动了服务器 http://localhost:3000');
});
