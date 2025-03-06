import { createRenderer } from "vue";

export function effect(fn, options?) {
  const _effect = new ActiveEffect(fn, () => { _effect.run() });
  _effect.run();
};

export let activeEffect = undefined;
const currentEffectStack = [];
class ActiveEffect {
  constructor(public fn, public scheduler) { }
  run() {
    activeEffect = this;
    currentEffectStack.push(activeEffect);
    this.fn();
    currentEffectStack.pop();
    activeEffect = currentEffectStack[createRenderer.length - 1];
  }
}
