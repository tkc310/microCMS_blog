import Link from 'next/link';
import { TTag } from '@/types';

type Props = {
  tag: TTag;
};

export default function TagButton({ tag }: Props) {
  return (
    <>
      <Link href={`/articles/tags/${tag.slug}`}>
        <a>{tag.name}</a>
      </Link>
    </>
  );
}
