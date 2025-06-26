export default {};
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
const b1 = config1
    .option('foo', 123)
    .option('foo', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get();
