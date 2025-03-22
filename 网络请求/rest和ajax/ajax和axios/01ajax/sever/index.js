const path = require('path');
const fs = require('fs');
const express = require('express');
const { ok } = require('assert');
const { BADFAMILY } = require('dns');
const app = express();

const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const fullFilePath = (filename) => {
  return path.resolve(__dirname, `../data/${filename}`);
};

const dataFilePath = fullFilePath('data');

const readFile =  (filePath) => {
  return Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err,fileData)=> {
      if (fileData) {
        return resolve(JSON.parse(fileData || '[]'));
      }
      if (err) {
        return reject(err);
      }
    })
  })
};
const writeFile = (filePath, fileData) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      filePath, 
      typeof fileData === 'string' ? fileData : JSON.stringify(fileData),
      { encoding: 'utf-8', mode: 438, flag: 'w' },
      err => {
        return err ? reject(err) : resolve();
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
  res.status().send({
    status:'error',
    code,
    data: errorInfo,
  });
};


app.get('/student', async (req, res)=> {
  try {
    const data = await readFile(dataFilePath);
    sendSuccessResult(res, data);
  } catch(err) {
    sendErrorResult(res, HTTP_STATUS.SERVER_ERROR, err);
  }
});

app.listen(3000, () => {
  console.log('启动了服务器 http://localhost:3000');
});
