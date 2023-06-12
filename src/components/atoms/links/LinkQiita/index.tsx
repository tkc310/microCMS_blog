import image from '@assets/qiita.png';
import { Link } from '@chakra-ui/react';
import Image from 'next/image';

type Props = {
  accountName: string;
};

export const LinkQiita = ({ accountName }: Props) => (
  <Link
    title="Qiita"
    href={`https://qiita.com/${accountName}`}
    rel="noopener"
    style={{ fontSize: '1.5rem' }}
    isExternal
  >
    <Image src={image} width="26" height="26" alt="qiita" />
  </Link>
);

export default LinkQiita;
