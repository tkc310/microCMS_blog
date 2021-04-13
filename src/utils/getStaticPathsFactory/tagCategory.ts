import fetchTags from '@utils/fetchTags';
import fetchCategories from '@utils/fetchCategories';

export const getStaticPathsFactory = ({
  type,
  resource,
}: {
  type: 'tag' | 'category';
  resource: 'article' | 'note';
}) => {
  const isTag = type === 'tag';

  return async () => {
    const results = isTag
      ? await fetchTags({ resource })
      : await fetchCategories();

    const pathName = isTag ? 'tags' : 'categories';
    const paths = results.map((item) => {
      return `/${resource}s/${pathName}/${item.slug}`;
    });

    return { paths, fallback: false };
  };
};

export default getStaticPathsFactory;
