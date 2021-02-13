import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const breakpoints = createBreakpoints({
  sm: '320px',
  // md: '768px',
  md: '600px',
  lg: '960px',
  xl: '1200px',
});

const theme = extendTheme({
  colors,
  breakpoints,
});

export default theme;
