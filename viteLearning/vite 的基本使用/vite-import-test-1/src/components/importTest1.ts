const increase = (count: number) => {
  return count + 1;
};
const decrease = (count: number) => {
  return count - 1;
};

export { increase, decrease };

type ImportTest1 = {
  increase: typeof increase;
  decrease: typeof decrease;
};
export type { ImportTest1 };
