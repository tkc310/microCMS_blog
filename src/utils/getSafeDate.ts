// publishedAtが存在しないケースがあるための対策
export const getSafeDate = (_date: any): Date => {
  const current = new Date();
  let date = _date ?? current;
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return Number.isNaN(date.getTime()) ? current : date;
};

export default getSafeDate;
