const { resolveCaa } = require('dns');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const getFullPath = (filename) => {
  return path.resolve(__dirname, filename);
};

let STUDENT_ARR = [];

const dataFilePath = getFullPath('data.json');

// 读文件
const readFile = (filePath) => {
  return new Promise((res, rej) => {
    fs.readFile(filePath, 'utf-8', (err, fileData) => {
      STUDENT_ARR = JSON.parse(fileData || '[]');
      console.log(1);
      res();
    });
  });
};
readFile(dataFilePath);

// 写文件
const writeFile = async (filePath, data) => {
  return new Promise((res) => {
    fs.writeFile(
      filePath,
      typeof data === 'string' ? data : JSON.stringify(data),
      { encoding: 'utf-8', mode: 438, flag: 'w' },
      (err) => {
        res();
      }
    );
  });
};
// 文件名 写入的内容 写入模式（覆盖| 追加） 错误处理

const sendSuccessResult = (res, data) => {
  res.send({
    status: 200,
    data,
  });
};
const sendErrorResult = (res, code, error) => {
  res.status(code).send({
    status: code,
    error: error,
  });
};

// 中间件
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 定义学生信息相关的路由
// 获取
app.get('/students', async (req, res) => {
  await readFile(dataFilePath);
  console.log(2);
  sendSuccessResult(res, STUDENT_ARR);
});

// 添加
app.post('/students', async (req, res) => {
  const { name, age, gender, address } = req.body;
  await readFile(dataFilePath);
  const id = STUDENT_ARR[STUDENT_ARR.length - 1].id + 1;
  STUDENT_ARR.push({
    id,
    name,
    age,
    gender,
    address,
  });
  await writeFile(dataFilePath, JSON.stringify(STUDENT_ARR));
  await sendSuccessResult(res, STUDENT_ARR);
});

// 删除
app.delete('/students/:id', async (req, res) => {
  const id = req.params.id;
  await readFile(dataFilePath);

  for (let i = 0; i < STUDENT_ARR.length; i++) {
    if (String(STUDENT_ARR[i].id) === String(id)) {
      const result = STUDENT_ARR[i];
      STUDENT_ARR.splice(i, 1);
      await writeFile(dataFilePath, JSON.stringify(STUDENT_ARR));
      return sendSuccessResult(res, result);
    }
  }
  sendErrorResult(res, 403, `没有找到 id 为 ${id} 的数据`);
});

// 修改一条的全部信息
app.put('/students', async (req, res) => {
  const { id, name, age, gender, address } = req.body;
  await readFile(dataFilePath);
  const student = STUDENT_ARR.find((row) => String(row.id) === String(id));
  if (student) {
    student.name = name;
    student.age = age;
    student.gender = gender;
    student.address = address;
    await writeFile(dataFilePath, JSON.stringify(STUDENT_ARR));
    return sendSuccessResult(res, student);
  }
  sendErrorResult(res, 403, `没有找到 id 为 ${id} 的数据`);
});

// 修改一条数据中的某些数据
app.patch('/students', async (req, res) => {
  await readFile(dataFilePath);
  // const data = req.body;
});

app.get('/students/:id', async (req, res) => {
  await readFile(dataFilePath);
  console.log(STUDENT_ARR);
  console.log(typeof STUDENT_ARR);
  const id = req.params.id;
  const student = STUDENT_ARR.find((row) => String(row.id) === String(id));
  sendSuccessResult(res, student ?? null);
});

// 监听
app.listen(3000, () => {
  console.log('开启了服务 http://localhost:3000');
});
