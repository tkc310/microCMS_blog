import { TCategory } from '@/types';
import { Tag, TagLabel, LinkBox, LinkOverlay } from '@chakra-ui/react';

type Props = {
  category: TCategory;
};

export const ButtonCategory = ({ category }: Props) => {
  let { color } = category;
  if (typeof category.color !== 'string') {
    color = 'gray';
  }

  return (
    <LinkBox>
      <LinkOverlay href={`/articles/categories/${category.slug}`}>
        <Tag size="md" key={category.id} variant="outline" colorScheme={color}>
          <TagLabel>{category?.name}</TagLabel>
        </Tag>
      </LinkOverlay>
    </LinkBox>
  );
};

export default ButtonCategory;
