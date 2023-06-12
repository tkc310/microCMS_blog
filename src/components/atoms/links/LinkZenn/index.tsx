import image from '@assets/zenn.png';
import { Link } from '@chakra-ui/react';
import Image from 'next/image';

type Props = {
  accountName: string;
};

export const LinkZenn = ({ accountName }: Props) => (
  <Link
    title="Zenn"
    href={`https://zenn.dev/${accountName}`}
    rel="noopener"
    style={{ fontSize: '1.5rem' }}
    isExternal
  >
    <Image src={image} width="26" height="26" alt="zenn" />
  </Link>
);

export default LinkZenn;
