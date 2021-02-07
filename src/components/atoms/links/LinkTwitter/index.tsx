import { Icon, Link } from '@chakra-ui/react';
import { FaTwitter } from 'react-icons/fa';

type Props = {
  accountName: string;
};

export const LinkTwitter = ({ accountName }: Props) => (
  <Link
    title="Twitter"
    href={`https://twitter.com/${accountName}`}
    rel="noopener"
    isExternal
  >
    <Icon as={FaTwitter} />
  </Link>
);

export default LinkTwitter;
