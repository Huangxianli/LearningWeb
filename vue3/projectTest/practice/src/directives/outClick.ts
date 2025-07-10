import type { Directive, DirectiveBinding } from 'vue';

const elHandlerMap: Map<HTMLElement, Set<() => any>> = new Map();

const handleOutClick = (event: Event) => {
  elHandlerMap.forEach((fnSet, el) => {
    if (el !== event.target && !el.contains(event.target as HTMLElement)) {
      fnSet.forEach((fn) => fn());
    }
  });
};

export const outClick: Directive<HTMLElement, () => any> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<() => any>) {
    if (typeof binding.value !== 'function') {
      return;
    }

    let handlerSet = elHandlerMap.get(el);
    if (!handlerSet) {
      handlerSet = new Set([binding.value]);
      elHandlerMap.set(el, handlerSet);
    } else {
      handlerSet.add(binding.value);
    }

    if (elHandlerMap.size === 1) {
      document.addEventListener('click', handleOutClick, true);
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding<() => any>) {
    if (binding.value === binding.oldValue) {
      return;
    }
    let handlerSet = elHandlerMap.get(el);
    if (!handlerSet) {
      handlerSet = new Set([]);
      elHandlerMap.set(el, handlerSet);
    }
    if (binding.oldValue) {
      handlerSet.delete(binding.oldValue);
    }
    if (typeof binding.value === 'function') {
      handlerSet.add(binding.value);
    }
  },
  beforeUnmount(el: HTMLElement) {
    elHandlerMap.get(el)?.clear();
    elHandlerMap.delete(el);
    if (elHandlerMap.size === 0) {
      document.removeEventListener('click', handleOutClick, true);
    }
  },
};
