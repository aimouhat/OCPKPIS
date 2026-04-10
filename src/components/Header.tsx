import { Box, Flex, Heading, Spacer, useColorMode, IconButton, Tooltip, Divider } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import IntegratedExploratoryMinesLogo from "./IntegratedExploratoryMinesLogo";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      p={3}
      bg="linear-gradient(135deg, #1a365d 0%, #2d3748 100%)"
      color="white"
      borderBottom="3px"
      borderColor="green.500"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.4)"
      position="sticky"
      top="0"
      zIndex="100"
      gap={6}
      minH="80px"
    >
      {/* Left side - Title */}
      <Box 
        display="flex"
        flexDirection="column"
        justifyContent="center"
        flex={1}
      >
        <Heading size="xl" fontWeight="bold" letterSpacing="tight">
          KPI Dashboard
        </Heading>
      </Box>

      {/* Center - OCP | SBU Mining with Future Is Mine Platform - Truly Centered */}
      <Flex 
        align="center"
        justify="center"
        gap={3}
        flex={1}
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        flexDirection="column"
      >
        <Flex 
          align="center"
          justify="center"
          gap={3}
        >
          <Heading 
            size="md" 
            fontWeight="bold" 
            color="green.400"
            letterSpacing="wide"
          >
            OCP
          </Heading>
          <Box 
            h={6} 
            w="2px" 
            bg="green.400" 
            opacity={0.7}
          />
          <Heading 
            size="sm" 
            fontWeight="600" 
            color="green.400"
            letterSpacing="wide"
          >
            SBU Mining
          </Heading>
        </Flex>
        <Heading 
          size="xs" 
          fontWeight="500" 
          color="green.400"
          opacity={0.9}
          mt={0}
        >
          Future Is Mine Platform
        </Heading>
      </Flex>

      {/* Spacer */}
      <Spacer />

      {/* Right side - Integrated Exploratory Mines Logo and Theme Toggle */}
      <Flex align="center" gap={4} minW="fit-content" flex={1} justify="flex-end">
        {/* Integrated Exploratory Mines Logo */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minW="fit-content"
        >
          <IntegratedExploratoryMinesLogo />
        </Box>

        {/* Theme Toggle */}
        <Tooltip label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}>
          <IconButton
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            color="white"
            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
            aria-label="Toggle color mode"
            size="lg"
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Header;