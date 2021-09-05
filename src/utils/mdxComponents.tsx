/* eslint-disable react/display-name */
// import { MDXRemote } from 'next-mdx-remote';
import { PhoneIcon } from '@chakra-ui/icons';
import CustomLink from '@/components/atoms/links/CustomLink';
import Image from '@/components/atoms/Image';

// MDXで利用可能なcomponent
const mdxComponents: any = {
  PhoneIcon,

  img: (props) => <Image {...props} />,
  a: (props) => <CustomLink {...props} />,
};

export default mdxComponents;
