class A {
  a;
  constructor(a) {
    this.a = a;
  }
  console = () => {
    return this.a;
  }
}
let a1 = new A(1);
console.log(a1.console());
console.log(a1.hasOwnProperty("console"));