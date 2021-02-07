export const getExcerpt = (body: string) => {
  const plane = body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
  return plane?.slice(0, 100) || '';
};

export default getExcerpt;
