import type { Directive, DirectiveBinding } from 'vue';

const elHandlerBindingMap: Map<
  HTMLElement,
  Set<{ handler: () => any; excludes: HTMLElement[] }>
> = new Map();

const handleOutClick = (event: Event) => {
  elHandlerBindingMap.forEach((fnSet, el) => {
    if (el !== event.target && !el.contains(event.target as HTMLElement)) {
      fnSet.forEach((handlerBinding) => {
        if (
          handlerBinding.excludes.some(
            (excludeEl) =>
              excludeEl === event.target ||
              excludeEl.contains(event.target as HTMLElement)
          )
        ) {
          return;
        }
        handlerBinding.handler();
      });
    }
  });
};

export const outClickExcludes: Directive<
  HTMLElement,
  { handler: () => any; excludes: HTMLElement[] }
> = {
  mounted(
    el: HTMLElement,
    binding: DirectiveBinding<{ handler: () => any; excludes: HTMLElement[] }>
  ) {
    const handlerBinding = {
      handler:
        typeof binding.value?.handler === 'function'
          ? binding.value.handler
          : () => void 0,
      excludes: Array.isArray(binding.value?.excludes)
        ? binding.value.excludes
        : [],
    };
    // if (typeof handlerBinding.handler !== 'function') {
    //   return;
    // }
    // if (!Array.isArray(handlerBinding.excludes)) {
    //   handlerBinding.excludes = [];
    // }

    let handlerBindingSet = elHandlerBindingMap.get(el);
    if (!handlerBindingSet) {
      handlerBindingSet = new Set([handlerBinding]);
      elHandlerBindingMap.set(el, handlerBindingSet);
    } else {
      handlerBindingSet.add(handlerBinding);
    }

    if (elHandlerBindingMap.size === 1) {
      document.addEventListener('click', handleOutClick, true);
    }
  },
  updated(
    el: HTMLElement,
    binding: DirectiveBinding<{ handler: () => any; excludes: HTMLElement[] }>
  ) {
    if (binding.value === binding.oldValue) {
      return;
    }
    let handlerBindingSet = elHandlerBindingMap.get(el);
    if (!handlerBindingSet) {
      handlerBindingSet = new Set();
      elHandlerBindingMap.set(el, handlerBindingSet);
    }
    if (binding.oldValue) {
      handlerBindingSet.forEach((item) => {
        if (item.handler === binding.oldValue!.handler) {
          handlerBindingSet.delete(item);
        }
      });
    }
    const handlerBinding = {
      handler:
        typeof binding.value?.handler === 'function'
          ? binding.value.handler
          : () => void 0,
      excludes: Array.isArray(binding.value?.excludes)
        ? binding.value.excludes
        : [],
    };
    handlerBindingSet.add(handlerBinding);
  },
  beforeUnmount(el: HTMLElement) {
    elHandlerBindingMap.get(el)?.clear();
    elHandlerBindingMap.delete(el);
    if (elHandlerBindingMap.size === 0) {
      document.removeEventListener('click', handleOutClick, true);
    }
  },
};
