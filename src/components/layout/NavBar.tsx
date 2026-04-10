import { Box, Flex, Heading, Spacer, IconButton, useColorMode, Icon } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from "react-router-dom";
import DashboardIcon from "../DashboardIcon";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500" color="white">
      <Flex align="center" mr={5} as={RouterLink} to="/">
        <Icon as={DashboardIcon} w={8} h={8} mr={2} color="whiteAlpha.900" />
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          OCP KPI Dashboard
        </Heading>
      </Flex>
      <Spacer />
      <Box>
        <IconButton aria-label="Toggle Color Mode" icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} onClick={toggleColorMode} />
      </Box>
    </Flex>
  );
};

export default NavBar;