function test1 () {
  console.log('---test1-----------------------------------------');
  const symbol1 = Symbol('symbol1');
  const symbol2 = Symbol(false);
  const symbol3 = Symbol(1);
  // const symbol4 = Symbol(Symbol()); // 会报错  Cannot convert a Symbol value to a string
  const symbol5 = Symbol({});
  console.log(symbol1); // Symbol(symbol1)
  console.log(symbol2); // Symbol(false)
  console.log(symbol3); // Symbol(1)
  console.log(symbol5); // Symbol([object Object])
};
test1();

function test2 () {
  console.log('---test1-----------------------------------------');
  const symbol2_1 = Symbol();
  console.log(String(symbol2_1)); // 'Symbol()'
  console.log(symbol2_1.toString()); // 'Symbol()'
};
test2();
