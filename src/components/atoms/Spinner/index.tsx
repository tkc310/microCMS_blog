import { memo } from 'react';
import { Spinner as ChakraSpinner } from '@chakra-ui/react';

export const Spinner = () => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translateY(-50%) translateX(-50%)',
    }}
  >
    <ChakraSpinner size="lg" />
  </div>
);

export default memo(Spinner);
