import { Icon, Link } from '@chakra-ui/react';
import { FaGithubAlt } from 'react-icons/fa';

type Props = {
  accountName: string;
};

export const LinkGithub = ({ accountName }: Props) => (
  <Link
    title="GitHub"
    href={`https://github.com/${accountName}`}
    rel="noopener"
    isExternal
  >
    <Icon as={FaGithubAlt} />
  </Link>
);

export default LinkGithub;
