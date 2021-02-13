import { TTag } from '@/types';

type TRet = TTag[] | TTag;

export const fetchTags = async (slug?: string): TRet => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const url = 'https://tkc310.microcms.io/api/v1/tags';
  const data = await fetch(url, key)
    .then((res) => res.json())
    .catch(() => null);

  if (slug) {
    return data.contents.find((item) => item.slug === slug);
  }
  return data.contents;
};

export default fetchTags;
