import { createRenderer } from "vue";

export function effect(fn, options?) {
  const _effect = new ActiveEffect(fn, () => { _effect.run() });
  _effect.run();
};

export let activeEffect = undefined;
const currentEffectStack = [];
class ActiveEffect {
  _trackId = 0;
  depsKeyDepsMap = [];
  depsKeyDepsMapLength = 0;
  constructor(public fn, public scheduler) {
    // 第一个参数是实际的副作用函数
    // 第二个参数是调度器
  }
  run() {
    activeEffect = this;
    currentEffectStack.push(activeEffect);
    this.fn();
    currentEffectStack.pop();
    activeEffect = currentEffectStack[createRenderer.length - 1];
  }
}
