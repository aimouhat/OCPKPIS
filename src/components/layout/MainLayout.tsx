import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const MainLayout = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Box>
        <NavBar />
      </Box>
      <Box flex={1} p={{ base: 2, md: 4 }} width="100%">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default MainLayout;