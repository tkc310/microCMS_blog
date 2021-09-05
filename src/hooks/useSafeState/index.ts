import useIsComponentMounted from './useIsComponentMounted';
import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

// @see https://reactjs.org/docs/hooks-reference.html#usestate
const useSafeState = <S = undefined>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] => {
  const isComponentMounted = useIsComponentMounted();
  const [state, setState] = useState(initialState);

  const newSetState = (newState: SetStateAction<S>) => {
    if (isComponentMounted.current) {
      setState(newState);
    }
  };

  return [state, newSetState];
};

export default useSafeState;
