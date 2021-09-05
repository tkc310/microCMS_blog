import { useEffect } from 'react';
import useSafeState from '@/hooks/useSafeState';
import { Flex, Box, LinkBox, LinkOverlay, IconButton } from '@chakra-ui/react';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import useScrollPosition from '@react-hook/window-scroll';
import { useDebouncedCallback } from 'use-debounce';

type Props = {
  onSideMenuOpen: () => void;
  isSideMenuOpen: boolean;
};

const THROTTLE = 1000 as const;

export const Navigation = ({ onSideMenuOpen, isSideMenuOpen }: Props) => {
  const [scrolled, setScrolled] = useSafeState(false);
  const scrollY = useScrollPosition(THROTTLE);
  const debounceScrolled = useDebouncedCallback(() => {
    setScrolled(scrollY > 0);
  }, THROTTLE);

  useEffect(() => {
    debounceScrolled();
  }, [debounceScrolled, scrollY]);

  return (
    <nav id="js-nav" className={`l-header${scrolled ? ' is-scrolled' : ''}`}>
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
