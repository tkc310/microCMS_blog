import fetchConfig from '@utils/fetchConfig';
import fetchTags from '@utils/fetchTags';
import fetchCategories from '@utils/fetchCategories';

export const getStaticPropsFactory = (type: 'tag' | 'category') => {
  const isTag = type === 'tag';

  return async (context) => {
    const { slug } = context.params;
    const key = {
      headers: { 'X-API-KEY': process.env.API_KEY },
    };

    const config = await fetchConfig();
    const categories = await fetchCategories();
    const tags = await fetchTags();

    const typeResult = isTag
      ? await fetchTags(slug)
      : await fetchCategories(slug);

    const filterName = isTag ? 'tags' : 'category';
    const filterType = isTag ? 'contains' : 'equals';
    const url = `${config.apiHost}articles`;
    const params = [
      `filters=${filterName}[${filterType}]${typeResult.id}`,
    ].join('&');
    const data = await fetch(`${url}?${params}`, key)
      .then((res) => res.json())
      .catch(() => null);
    const { contents: articles } = data;
    const props = {
      articles,
      categories,
      tags,
      config,
    };

    return {
      props: { ...props, ...{ [type]: typeResult } },
    };
  };
};

export default getStaticPropsFactory;
