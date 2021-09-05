import { memo, useEffect, useRef } from 'react';
import * as tocbot from 'tocbot';
import useWindowSize from '@/hooks/useWindowSize';
import useSafeState from '@/hooks/useSafeState';

type Props = {
  isSide?: boolean;
};

const defaultProps = {
  isSide: false,
};

const TARGET_NODES = 'h1, h2, h3, h4, h5, h6';

// @see https://tscanlin.github.io/tocbot/
export const TOC = ({ isSide }: Props) => {
  const unmountRef = useRef(false);
  const size = useWindowSize();
  const isDesktop = size.width >= 1080;
  const [isHidden, setIsHidden] = useSafeState(true);

  useEffect(() => {
    const unnecessary = (isDesktop && !isSide) || (!isDesktop && isSide);
    const exists = !!document.querySelectorAll('h2, h3, h4, h5, h6')?.length;

    if (!unmountRef.current) {
      setIsHidden(unnecessary || !exists);
    }

    return () => {
      unmountRef.current = true;
    };
  }, [isDesktop, isSide, setIsHidden]);

  useEffect(() => {
    if (isHidden) {
      return () => {};
    }

    tocbot.init({
      tocSelector: '#js-toc',
      contentSelector: '#js-toc-content',
      headingSelector: TARGET_NODES,
      hasInnerContainers: true,
      orderedList: false,
      headingsOffset: 100,
      // @ts-ignore
      scrollSmoothOffset: -48,
    });

    return () => {
      tocbot.destroy();
    };
  }, [isHidden]);

  return isHidden ? null : <aside id="js-toc" className="toc" />;
};

TOC.defaultProps = defaultProps;

export default memo(TOC);
