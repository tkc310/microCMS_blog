import { useState, useEffect } from 'react';
import { Flex, Box, LinkBox, LinkOverlay, IconButton } from '@chakra-ui/react';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import useScrollPosition from '@react-hook/window-scroll';

type Props = {
  onSideMenuOpen: () => void;
  isSideMenuOpen: boolean;
};

export const Navigation = ({ onSideMenuOpen, isSideMenuOpen }: Props) => {
  const [scrolled, setScrolled] = useState(false);
  const scrollY = useScrollPosition(1);

  useEffect(() => {
    setScrolled(scrollY > 0);
  }, [scrollY]);

  return (
    <nav className={`l-header${scrolled ? ' is-scrolled' : ''}`}>
      <Flex align="center" justify="flex-start" w="100%">
        <Box>
          <LinkBox>
            <LinkOverlay href="/">
              <div className="l-header_logo">tkc310_log</div>
            </LinkOverlay>
          </LinkBox>
        </Box>

        <Box ml="auto">
          {isSideMenuOpen ? (
            <IconButton
              isRound
              variant="ghost"
              aria-label="opened side menu"
              icon={<AiOutlineMenuUnfold size={30} />}
            />
          ) : (
            <IconButton
              onClick={onSideMenuOpen}
              isRound
              variant="ghost"
              aria-label="open side menu"
              icon={
                <AiOutlineMenuFold style={{ cursor: 'pointer' }} size={30} />
              }
            />
          )}
        </Box>
      </Flex>
    </nav>
  );
};

export default Navigation;
