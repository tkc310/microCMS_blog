/* eslint-disable react/display-name */
// import { MDXRemote } from 'next-mdx-remote';
import { PhoneIcon } from '@chakra-ui/icons';
import CustomLink from '@/components/atoms/links/CustomLink';
import CustomHeading from '@/components/atoms/CustomHeading';
import CustomImage from '@/components/atoms/CustomImage';

// MDXで利用可能なcomponent
const mdxComponents: any = {
  PhoneIcon,

  img: (props) => <CustomImage {...props} />,
  a: (props) => <CustomLink {...props} />,
  h1: (props) => <CustomHeading as="h1" {...props} />,
  h2: (props) => <CustomHeading as="h2" {...props} />,
  h3: (props) => <CustomHeading as="h3" {...props} />,
  h4: (props) => <CustomHeading as="h4" {...props} />,
  h5: (props) => <CustomHeading as="h5" {...props} />,
  h6: (props) => <CustomHeading as="h6" {...props} />,
};

export default mdxComponents;
