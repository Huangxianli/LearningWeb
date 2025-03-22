const person = {
  name: "jw",
  get aliasName () {
    return this.name + "handsome";
  },
};

let proxyPerson = new Proxy(person, {
  get (target, key, recevier) {
    // recevier 是代理对象
    console.log(key);
    return target[key];
    // return Reflect.get(target, key, recevier); // (recevier[key]); // person.name 不会触发get
  },
});

console.log(proxyPerson.aliasName);
//  return target[key]; 这种情况下，proxyPerson.aliasName 访问到的是 person.name 但是，我们实际收集依赖的对象是 proxyPerson 而不是 person，所以读 proxyPerson.aliasName，不会触发 proxy 里面的 get
// return receiver[key]; proxyPerson.aliasName 访问到的是 proxyPerson.name，这个时候，会进入到 proxy 的 get 中，然后又会调用 proxyPerson.name 一直这样，进入了死循环