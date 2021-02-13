export const getRange = (start: number, end: number): number[] =>
  [...Array(end - start + 1)].map((_, i) => start + i);

export default getRange;
