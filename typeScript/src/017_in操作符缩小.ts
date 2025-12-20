/* 使用 in 操作符来判断一个特有属性是否处于一个类型中，这样可以进行范围缩小 */
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    return animal.swim();
  } else if ('fly' in animal) {
    return animal.fly();
  }
}
