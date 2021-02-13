import { Heading, Text, Box } from '@chakra-ui/react';
import LayoutRoot from '@components/layouts/LayoutRoot';
import fetchConfig from '@utils/fetchConfig';
import { TConfig } from '@/types';

type Props = {
  config: TConfig;
};

export const Custom404 = ({ config }: Props) => (
  <LayoutRoot config={config}>
    <div className="l-content">
      <Box textAlign="center" style={{ marginTop: '30%' }}>
        <Heading as="h1">404 - Not Found</Heading>
        <Text>ページが見つかりませんでした。</Text>
      </Box>
    </div>
  </LayoutRoot>
);

export const getStaticProps = async () => {
  const config = await fetchConfig();
  return {
    props: {
      config,
    },
  };
};

export default Custom404;
