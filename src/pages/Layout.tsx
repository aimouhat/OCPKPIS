import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <Box>
      <Header />
      <Box as="main" p={5}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;