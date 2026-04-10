import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: (props: any) => ({
    body: {
      bg: mode("gray.100", "#121212")(props),
      color: mode("gray.800", "whiteAlpha.900")(props),
    },
  }),
};

const components = {
  // You can add component-specific style overrides here
  // For example, for all Cards (used by widgets)
  Card: {
    baseStyle: (props: any) => ({
      container: {
        backgroundColor: mode("white", "navy.800")(props),
      },
    }),
  },
};

const theme = extendTheme({ config, styles, components });

export default theme;