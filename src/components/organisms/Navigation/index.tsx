import { useState } from 'react';
import Link from 'next/link';
// import Burger from "./Burger";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
} from '@chakra-ui/icons';

export const Navigation = () => {
  return (
    <nav className="l-header">
      <Link href="/">
        <div className="l-header_logo">tkc310_log</div>
      </Link>

      {/* <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          size="xs"
          variant="outline"
          onClick={() => setActive(!active)}
        />
        <MenuList>
          <MenuItem icon={<AddIcon />} command="⌘T">
            New Tab
          </MenuItem>
          <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
            New Window
          </MenuItem>
          <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
            Open Closed Tab
          </MenuItem>
          <MenuItem icon={<EditIcon />} command="⌘O">
            Open File...
          </MenuItem>
        </MenuList>
      </Menu>
      <div className={`container ${active ? 'active' : ''}`}>
        <ul>
          <li>
            <Link href="/">
              <a className={router.pathname === '/' ? 'active' : null}>about</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className={router.pathname.startsWith('/') ? 'active' : null}>
                blog
              </a>
            </Link>
          </li>
        </ul>
      </div >
    */}
    </nav>
  );
};

export default Navigation;
