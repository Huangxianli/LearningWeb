export default {};

type TypeLookup<T, U> = T extends { type: U } ? T : never;

interface Cat {
  type: 'cat';
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
}

interface Dog {
  type: 'dog';
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
  color: 'brown' | 'white' | 'black';
}

type A = TypeLookup<Cat | Dog, 'dog'>;

type Extends1<T extends { type: string }, U> = T['type'] extends U
  ? // 由于这里访问的其实是 T['type'] 而不是 T 本身，这里不会有分布式
    true
  : false;

const extends1 = { type: '' } as const;

type Extends1_1 = Extends1<typeof extends1, ''>;
type Extends1_3 = { type: '' };
type Extends1_2 = Extends1<Extends1_3, ''>;
type Extends1_4 = Extends1<Cat | Dog, 'dog'>;
