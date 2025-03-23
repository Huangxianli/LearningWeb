const fs = require('fs');
const path = require('path');

const getFullPath = (relativePath = '../data/students.json') => {
  return path.resolve(__dirname, relativePath);
};
const readFile = (absolutePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(absolutePath, 'utf-8', (err, fileData) => {
      if (err) {
        return reject(err);
      }
      return resolve(JSON.parse(fileData || '[]'));
    });
  });
};

const writeFile = (absolutePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      absolutePath,
      data,
      { encoding: 'utf-8', mode: 438, flag: 'w' },
      (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      }
    );
  });
};

module.exports = {
  getFullPath,
  readFile,
  writeFile,
};
