import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false, // Explicitly set dark mode
};

const styles = {
  global: (props: any) => ({
    body: {
      bg: mode("gray.100", "gray.800")(props), // Light mode fallback, dark mode primary
      color: mode("gray.800", "whiteAlpha.900")(props),
    },
  }),
};

const components = {
  // You can override component styles here globally
  // Example:
  // Button: { baseStyle: { fontWeight: "bold" } }
};

const theme = extendTheme({ config, styles, components });

export default theme;