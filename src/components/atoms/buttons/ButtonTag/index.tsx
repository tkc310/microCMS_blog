import { TTag } from '@/types';
import { Tag, TagLabel, LinkBox, LinkOverlay } from '@chakra-ui/react';

type Props = {
  tag: TTag;
};

export const ButtonTag = ({ tag }: Props) => {
  return (
    <LinkBox>
      <LinkOverlay href={`/articles/tags/${tag.slug}`}>
        <Tag
          size="md"
          key={tag.id}
          borderRadius="full"
          variant="solid"
          colorScheme={tag.color || undefined}
        >
          <TagLabel>{tag.name}</TagLabel>
        </Tag>
      </LinkOverlay>
    </LinkBox>
  );
};

export default ButtonTag;
