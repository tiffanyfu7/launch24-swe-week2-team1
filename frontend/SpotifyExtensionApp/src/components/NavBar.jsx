import React, { useContext } from 'react';
import {
  Box,
  Flex,
  Icon,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { LuMessagesSquare, LuCompass } from "react-icons/lu";
import { IoIosPaperPlane } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import '../NavBar.css';
import { AuthContext } from './AuthContext';

const LinkItems = [
  { name: 'Discover', icon: LuCompass },
  { name: 'Forum', icon: LuMessagesSquare },
  { name: 'Inbox', icon: IoIosPaperPlane },
  { name: 'Library', icon: FaRegHeart },
   { name: 'Landing'}
];

const iconStyle = { color: "black" };
const iconStyleHover = { color: "white" };


const NavItem = ({ icon, ...rest }) => (
  <Link href={icon.name} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
    <Flex
      align="center"
      p="6"
      borderRadius="lg"
      role="group"
      className = "nav-item"
      cursor="pointer"
      _hover={{
        bg: '#2B6361',
        color: 'white',
        borderRadius: '25px',
      }}
      {...rest}>
      {icon.icon && (
        <Icon
          mr="3"
          ml="3"
          mt="2"
          fontSize="45"
          style={iconStyle}
          _groupHover={iconStyleHover}
          as={icon.icon}
        />
      )}
    </Flex>
  </Link>
);

const SidebarContent = ({ handleLogout }) => (
  
  <Box
    bg={useColorModeValue('white', 'gray.900')}
    borderRight="1px"
    borderRightColor={useColorModeValue('gray.200', 'gray.700')}
    w={{ base: 'full', md: 60 }}
    paddingRight="5px"
    paddingLeft="5px"
    paddingTop="8px"
    pos="fixed"
    top="0"
    left="0"
    h="100vh"
    className="sidebar"
    display="flex"
    flexDirection="column"
  >
    <Box flex="1">
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link} />
      ))}
    </Box>
    {/*  TODO: ahbinav implement logout functionality */}
    <Box marginBottom={20} >
      <button className="logout-button" onClick={handleLogout}>Log out</button>
    </Box>
  </Box>
);

const NavBar = () => {

  const { handleLogout } = useContext(AuthContext);

  return (
    <SidebarContent handleLogout={handleLogout}/>
  );
};

export default NavBar;
