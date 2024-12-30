import { getRandNum } from '@/utils/matchFun';
const ajax = function (data) {
  return new Promise(reolve => {
    const result = {
      code: 200,
      data
    }
    setTimeout(() => {
      reolve(result);
    }, getRandNum());
  })
};
export default ajax;