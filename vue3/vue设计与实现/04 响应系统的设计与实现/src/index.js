/**
 * 
 */

export function reactive (data) { };

const reactive1 = (data) => {
  return new Proxy(data, {
    get (tagret, key) {
      return tagret[key];
    },
    set (target, key, value) {
      target[key] = value;
    },
  });
};