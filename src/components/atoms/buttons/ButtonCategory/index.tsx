import Link from 'next/link';
import { TCategory } from '@/types';
import { Tag, TagLabel } from '@chakra-ui/react';

type Props = {
  category: TCategory;
};

export const ButtonCategory = ({ category }: Props) => {
  return (
    <Link href={`/articles/categories/${category.slug}`}>
      <Tag size="sm" key={category.id} variant="outline" colorScheme="blue">
        <TagLabel>{category?.name}</TagLabel>
      </Tag>
    </Link>
  );
};

export default ButtonCategory;
