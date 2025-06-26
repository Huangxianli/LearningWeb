export default {};

type ChainbaleOptions<T extends {} = {}> = {
  option: <K extends keyof any, V>(
    key: K,
    value: V
  ) => ChainbaleOptions<T & Record<K, V>>;
  get: () => T;
};

declare const config: ChainbaleOptions;

const a1 = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get();

const a2 = config
  .option('foo', 123)
  .option('foo', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get();

// 有相同的 key 且不兼容的时候会有问题
type A2 = ObjectType<typeof a2>;

type ChainbaleOptions1<T extends {} = {}> = {
  option: <K extends keyof any, V>(
    key: K,
    value: V
  ) => ChainbaleOptions1<Omit<T, K> & Record<K, V>>;
  get: () => T;
};

declare const config1: ChainbaleOptions1;
const b1 = config1
  .option('foo', 123)
  .option('foo', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get();
type B1 = ObjectType<typeof b1>;
