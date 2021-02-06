export const fetchConfig = async () => /* TConfig */ {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const url = 'https://tkc310.microcms.io/api/v1/configs';
  const data = await fetch(url, key)
    .then((res) => res.json())
    .catch(() => null);

  return data;
};

export default fetchConfig;
