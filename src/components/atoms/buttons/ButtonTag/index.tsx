import Link from 'next/link';
import { TTag } from '@/types';
import { Tag, TagLabel } from '@chakra-ui/react';

type Props = {
  tag: TTag;
};

export default function TagButton({ tag }: Props) {
  return (
    <Link href={`/articles/tags/${tag.slug}`}>
      <Tag
        size="sm"
        key={tag.id}
        borderRadius="full"
        variant="solid"
        colorScheme="green"
      >
        <TagLabel>{tag.name}</TagLabel>
      </Tag>
    </Link>
  );
}
