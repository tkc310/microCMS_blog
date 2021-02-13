import { useState, useEffect } from 'react';
import { LinkBox, LinkOverlay } from '@chakra-ui/react';
import useScrollPosition from '@react-hook/window-scroll';

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const scrollY = useScrollPosition(1);

  useEffect(() => {
    setScrolled(scrollY > 0);
  }, [scrollY]);

  return (
    <nav className={`l-header${scrolled ? ' is-scrolled' : ''}`}>
      <LinkBox>
        <LinkOverlay href="/">
          <div className="l-header_logo">tkc310_log</div>
        </LinkOverlay>
      </LinkBox>
    </nav>
  );
};

export default Navigation;
