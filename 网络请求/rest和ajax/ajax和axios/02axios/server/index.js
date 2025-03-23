const express = require('express');
const { getFullPath, readFile, writeFile } = require('./fileTools');
const { sendSuccessResult, sendErrorResult } = require('./sendTools');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const filePath = getFullPath();
app.get('/student', async (req, res) => {
  try {
    const data = await readFile(filePath);
    sendSuccessResult(res, data);
  } catch (err) {
    sendErrorResult(res, 403, err);
  }
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
