import React from 'react';
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
  <Link href={icon.name} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }} >
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: '#2B6361',
        color: 'white',
        borderRadius: '25',
      }}
      {...rest}>
      {icon.icon && (
        <Icon
          mr="4"
          fontSize="45"
          paddingTop={12}
          paddingBottom={12}
          style={iconStyle}
          _groupHover={iconStyleHover}
          as={icon.icon}
          paddingRight={10}
          paddingLeft={10}
        />
      )}
    </Flex>
  </Link>
);

const SidebarContent = () => (
  <Box
    bg={useColorModeValue('white', 'gray.900')}
    borderRight="1px"
    borderRightColor={useColorModeValue('gray.200', 'gray.700')}
    w={{ base: 'full', md: 60 }}
    pos="fixed"
    h="100vh"
  
  >
    
    {LinkItems.map((link) => (
      <NavItem key={link.name} icon={link} />
    ))}
  </Box>
);

const NavBar = () => {
  return (
    // <Box minH="100vh" bg='black'>
    //   <SidebarContent />
    // </Box>
    <SidebarContent />
  );
};

export default NavBar;
