type Args = {
  slug?: string;
  resource?: string;
};

export const fetchTags = async (props?: Args) => {
  const { slug, resource } = props || {};
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  let prefix = '';
  if (resource && resource !== 'article') {
    prefix = `${resource}_`;
  }
  const url = `https://tkc310.microcms.io/api/v1/${prefix}tags`;
  const data = await fetch(url, key)
    .then((res) => res.json())
    .catch(() => null);

  if (slug) {
    return data.contents.find((item) => item.slug === slug);
  }
  return data.contents;
};

export default fetchTags;
