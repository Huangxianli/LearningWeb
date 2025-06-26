export default {};

type DeepReadonly<T extends object> = T extends (
  ...arg: any
) => any | Map<any, any> | Set<any> | WeakMap<any, any>
  ? T
  : {
      +readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
    };

type A1 = DeepReadonly<() => {}>;
type A2 = Readonly<[]>;
const b = [] as const;
type B = keyof Map<any, any> extends never ? true : false;

type _DeepReadonly<T> = keyof T extends never
  ? T
  : T extends Map<any, any> | Set<any>
  ? T
  : { readonly [k in keyof T]: _DeepReadonly<T[k]> };

type C = _DeepReadonly<{ a: Map<any, any> }>;
