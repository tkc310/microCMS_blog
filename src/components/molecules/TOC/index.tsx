import { memo, useEffect } from 'react';
import * as tocbot from 'tocbot';
import useWindowSize from '@/hooks/useWindowSize';

type Props = {
  isSide?: boolean;
};

const defaultProps = {
  isSide: false,
};

// @see https://tscanlin.github.io/tocbot/
export const TOC = ({ isSide }: Props) => {
  const size = useWindowSize();
  const isDesktop = size.width >= 1080;
  const isHidden = (isDesktop && !isSide) || (!isDesktop && isSide);

  useEffect(() => {
    if (isHidden) {
      return () => {};
    }

    tocbot.init({
      tocSelector: '#js-toc',
      contentSelector: '#js-toc-content',
      headingSelector: 'h1, h2, h3, h4, h5, h6',
      hasInnerContainers: true,
      orderedList: false,
      headingsOffset: 100,
      scrollSmoothOffset: -48,
    });

    return () => {
      tocbot.destroy();
    };
  });

  return isHidden ? null : <aside id="js-toc" className="toc" />;
};

TOC.defaultProps = defaultProps;

export default memo(TOC);
