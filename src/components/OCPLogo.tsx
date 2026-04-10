import { Box } from "@chakra-ui/react";

const OCPLogo = (props: any) => {
  return (
    <Box as="svg" viewBox="0 0 600 180" width="220px" height="80px" {...props}>
      {/* Laurel wreath - Left side */}
      <g>
        {/* Left leaves */}
        <ellipse cx="35" cy="50" rx="6" ry="12" fill="#22c55e" opacity="0.9" transform="rotate(-60 35 50)" />
        <ellipse cx="28" cy="65" rx="5" ry="10" fill="#22c55e" opacity="0.85" transform="rotate(-40 28 65)" />
        <ellipse cx="30" cy="82" rx="5" ry="9" fill="#22c55e" opacity="0.8" transform="rotate(-20 30 82)" />
        <ellipse cx="38" cy="95" rx="5" ry="8" fill="#22c55e" opacity="0.75" transform="rotate(0 38 95)" />
      </g>

      {/* Center Circle with Star - Left side of circle */}
      <circle cx="60" cy="72" r="45" fill="none" stroke="#22c55e" strokeWidth="3" opacity="0.3" />
      
      {/* Five-pointed star in center */}
      <g fill="#22c55e">
        <polygon points="60,35 68,57 92,57 75,70 83,92 60,79 37,92 45,70 28,57 52,57" />
      </g>

      {/* Laurel wreath - Right side */}
      <g>
        {/* Right leaves */}
        <ellipse cx="85" cy="50" rx="6" ry="12" fill="#22c55e" opacity="0.9" transform="rotate(60 85 50)" />
        <ellipse cx="92" cy="65" rx="5" ry="10" fill="#22c55e" opacity="0.85" transform="rotate(40 92 65)" />
        <ellipse cx="90" cy="82" rx="5" ry="9" fill="#22c55e" opacity="0.8" transform="rotate(20 90 82)" />
        <ellipse cx="82" cy="95" rx="5" ry="8" fill="#22c55e" opacity="0.75" transform="rotate(0 82 95)" />
      </g>

      {/* "OCP" Text - Bold and Green */}
      <text 
        x="150" 
        y="85" 
        fontSize="72" 
        fontWeight="900" 
        fill="#22c55e" 
        fontFamily="Arial, Helvetica, sans-serif"
        letterSpacing="-2"
      >
        OCP
      </text>

      {/* Vertical separator line */}
      <line x1="290" y1="35" x2="290" y2="125" stroke="#22c55e" strokeWidth="3" />

      {/* "SBU Mining" text on the right */}
      <text 
        x="320" 
        y="75" 
        fontSize="28" 
        fontWeight="600" 
        fill="#22c55e" 
        fontFamily="Arial, Helvetica, sans-serif"
      >
        SBU
      </text>
      <text 
        x="320" 
        y="105" 
        fontSize="24" 
        fontWeight="500" 
        fill="#22c55e" 
        fontFamily="Arial, Helvetica, sans-serif"
      >
        Mining
      </text>

      {/* "Future Is Mine Platform" text below */}
      <text 
        x="60" 
        y="145" 
        fontSize="16" 
        fontWeight="600" 
        fill="#22c55e" 
        fontFamily="Arial, Helvetica, sans-serif"
        textAnchor="middle"
      >
        Future Is Mine Platform
      </text>
    </Box>
  );
};

export default OCPLogo;
