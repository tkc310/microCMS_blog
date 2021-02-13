import fetchTags from '@utils/fetchTags';
import fetchCategories from '@utils/fetchCategories';

export const getStaticPathsFactory = (type: 'category' | 'tag') => {
  const isTag = type === 'tag';

  return async () => {
    const results = isTag ? await fetchTags() : await fetchCategories();

    const pathName = isTag ? 'tags' : 'categories';
    const paths = results.map((item) => {
      return `/articles/${pathName}/${item.slug}`;
    });

    return { paths, fallback: false };
  };
};

export default getStaticPathsFactory;
