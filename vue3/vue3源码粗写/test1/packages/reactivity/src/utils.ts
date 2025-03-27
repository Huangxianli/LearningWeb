export const isObject = <T>(data: T): data is Extract<T, object> => {
  return typeof data === 'object' && data !== null;
};
