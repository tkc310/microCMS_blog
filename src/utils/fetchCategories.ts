export const fetchCategories = async (slug?: string) => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const url = 'https://tkc310.microcms.io/api/v1/categories';
  const data = await fetch(url, key)
    .then((res) => res.json())
    .catch(() => null);

  if (slug) {
    return data.contents.find((item) => item.slug === slug);
  }
  return data.contents;
};

export default fetchCategories;
