import { TTag } from '@/types';
import { Tag, TagLabel, LinkBox, LinkOverlay } from '@chakra-ui/react';

type Props = {
  tag: TTag;
  resource?: 'article' | 'note';
};

const defaultProps = {
  resource: 'article',
};

export const ButtonTag = ({ tag, resource }: Props) => {
  let { color } = tag;
  if (!color?.length) {
    color = ['gray'];
  }

  return (
    <LinkBox>
      <LinkOverlay href={`/${resource}s/tags/${tag.slug}`}>
        <Tag size="md" key={tag.id} variant="subtle" colorScheme={color}>
          <TagLabel>{tag.name}</TagLabel>
        </Tag>
      </LinkOverlay>
    </LinkBox>
  );
};

ButtonTag.defaultProps = defaultProps;

export default ButtonTag;
