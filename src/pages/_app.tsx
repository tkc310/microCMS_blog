import { AppProps } from 'next/app';
import useGTM from '@/hooks/useGTM';

import { ChakraProvider } from '@chakra-ui/react';
import theme from '@styles/theme';
import '@styles/entry/globals.scss';
import '@styles/components/layouts/index.scss';
import '@styles/components/Toc.scss';

export const App = ({ Component, pageProps }: AppProps) => {
  useGTM();

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
