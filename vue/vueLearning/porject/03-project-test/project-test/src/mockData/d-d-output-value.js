const outPutListData = (function () {
  const data = [];
  for (let i = 0; i < 95; i++) {
    const item = {
      key: i,
      name: `${i}几号店`,
      amount: '234,324',
    };
    data.push(item);
  }
  return data;
})();

export { outPutListData };

