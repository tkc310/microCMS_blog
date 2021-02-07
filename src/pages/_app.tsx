import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@styles/theme';
import '@styles/entry/globals.scss';
import '@styles/components/layouts/main.scss';

export const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default App;
