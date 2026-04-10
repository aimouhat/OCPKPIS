import { Box, useColorModeValue } from "@chakra-ui/react";

const IntegratedExploratoryMinesLogo = (props: any) => {
  const textColor = useColorModeValue("white", "gray.800");
  const greenColor = "#22c55e";

  return (
    <Box as="svg" viewBox="0 0 400 200" width="240px" height="90px" {...props}>
      {/* Top Green Bar with "INTEGRATED" */}
      <rect x="20" y="20" width="360" height="40" fill={greenColor} rx="4" />
      <text
        x="200"
        y="50"
        fontSize="28"
        fontWeight="bold"
        fill={textColor}
        fontFamily="Arial, sans-serif"
        textAnchor="middle"
      >
        INTEGRATED
      </text>

      {/* Middle Text "EXPLORATORY" */}
      <text
        x="200"
        y="100"
        fontSize="32"
        fontWeight="bold"
        fill={greenColor}
        fontFamily="Arial, sans-serif"
        textAnchor="middle"
      >
        EXPLORATORY
      </text>

      {/* Bottom Green Bar with "MINES" */}
      <rect x="20" y="120" width="360" height="40" fill={greenColor} rx="4" />
      <text
        x="200"
        y="150"
        fontSize="28"
        fontWeight="bold"
        fill={textColor}
        fontFamily="Arial, sans-serif"
        textAnchor="middle"
      >
        MINES
      </text>
    </Box>
  );
};

export default IntegratedExploratoryMinesLogo;
