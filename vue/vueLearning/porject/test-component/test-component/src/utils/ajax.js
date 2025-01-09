function getRandNum (min = 0, max = 5000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function returnResult (mockData, reTime = 0) {
  return new Promise((resolve, reject) => {
    const result = {
      httpCode: 200,
      data: {
        code: 200,
        data: mockData
      }
    };
    setTimeout(() => {
      if (getRandNum(0, 100) <= 95) {
        // 这个 if 是模拟浏览器的 httpCode 是200 的情况
        // 但是也有可能 后端返回的 code 不是 200
        getRandNum(0, 100) <= 95 ? result.data.code = 200 : result.data.code = 500;
        resolve(result.data);
      } else {
        result.httpCode = 500;
        result.data = null;
        if (reTime) { // 如果请求失败，进行重试
          resolve(returnResult(mockData, reTime - 1));
        } else {
          reject(result);
        }
      }
    }, getRandNum());
  })
}

class Ajax {
  constructor() {

  }
  static get (url, params, mockData, reTime = 0) {
    url;
    params;
    return returnResult(mockData, reTime);

  }
  static post (url, params, mockData) {
    url;
    params;
    return returnResult(mockData);
  }
}
export default Ajax; 