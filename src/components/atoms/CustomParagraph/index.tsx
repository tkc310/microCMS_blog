import { VFC, memo, ReactElement } from 'react';

type Props = {
  children: ReactElement;
};

// eslint-disable-next-line react/prop-types
const CustomParagraph: VFC<Props> = ({ children }) => {
  // if (children) return null;
  const isParagraph = typeof children === 'string';
  return isParagraph ? (
    <p>{children}</p>
  ) : (
    <div style={{ margin: '16px 0' }}>{children}</div>
  );
};

export default memo(CustomParagraph);
