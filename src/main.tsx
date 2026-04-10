import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App";
import theme from "./theme"; // Your custom theme
import "./index.css"; // You can keep this for any truly global styles not handled by Chakra
import { toggleMockData, logConfig } from "./config/devConfig";

// Expose dev functions to window object for easy access in browser console
if (typeof window !== 'undefined') {
  (window as any).devTools = {
    toggleMockData,
    logConfig,
  };
  console.log(
    '%c🛠️ Dev Tools Available',
    'color: green; font-weight: bold; font-size: 14px;',
    '\nIn console, use:',
    '\n- window.devTools.toggleMockData(true/false) - Enable/disable mock data',
    '\n- window.devTools.logConfig() - Show current configuration'
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
