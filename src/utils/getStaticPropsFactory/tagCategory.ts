import fetchConfig from '@utils/fetchConfig';
import fetchTags from '@utils/fetchTags';
import fetchCategories from '@utils/fetchCategories';

export const getStaticPropsFactory = ({
  type,
  resource,
}: {
  type: 'tag' | 'category';
  resource: 'article' | 'note';
}) => {
  const isTag = type === 'tag';

  return async (context) => {
    const { slug } = context.params;
    const key = {
      headers: { 'X-API-KEY': process.env.API_KEY },
    };

    const config = await fetchConfig();
    const categories = await fetchCategories();
    const tags = await fetchTags({ resource });

    const typeResult = isTag
      ? await fetchTags({ slug, resource })
      : await fetchCategories(slug);

    const filterName = isTag ? 'tags' : 'category';
    const filterType = isTag ? 'contains' : 'equals';
    const url = `${config.apiHost}${resource}s`;
    const params = [
      `filters=${filterName}[${filterType}]${typeResult.id}`,
    ].join('&');
    const data = await fetch(`${url}?${params}`, key)
      .then((res) => res.json())
      .catch(() => null);
    const { contents } = data;
    const props = {
      contents,
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
