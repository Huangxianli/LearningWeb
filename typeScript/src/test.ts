interface Test1 {
  a: 'abc' | 'aaa'
};
let a1: Test1 = {
  a: 'abc'
};
function testa1(string1: 'abc' | 'aaa') { };
testa1(a1.a);