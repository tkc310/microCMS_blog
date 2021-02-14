export const getExcerpt = (body: string) => {
  const plane = body
    .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
    .replace(/\n/g, '');
  const isOver = plane.length >= 100;
  return `${plane?.slice(0, 99)}${isOver ? '…' : ''}` || '';
};

export default getExcerpt;
