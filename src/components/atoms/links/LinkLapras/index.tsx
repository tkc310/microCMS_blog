import image from '@assets/lapras.png';
import { Link } from '@chakra-ui/react';
import Image from 'next/image';

type Props = {
  accountName: string;
};

export const LinkLapras = ({ accountName }: Props) => (
  <Link
    title="Lapras"
    href={`https://lapras.com/public/${accountName}`}
    rel="noopener"
    style={{ fontSize: '1.5rem' }}
    isExternal
  >
    <Image src={image} width="26" height="26" alt="lapras" />
  </Link>
);

export default LinkLapras;
