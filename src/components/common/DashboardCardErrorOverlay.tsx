import { Box, Heading, VStack, HStack, Text, Divider, Center } from "@chakra-ui/react";
import DashboardCard from "./DashboardCard";

interface Props {
  widgetName?: string;
  message?: string;
  showPlaceholder?: boolean;
}

const DashboardCardErrorOverlay = ({ 
  widgetName = "Widget", 
  message = "Could not retrieve data for this widget.",
  showPlaceholder = true 
}: Props) => {
  return (
    <DashboardCard h="100%" position="relative" overflow="hidden">
      {/* Placeholder content with blur */}
      {showPlaceholder && (
        <VStack h="100%" spacing={4} opacity={0.2} pointerEvents="none" filter="blur(3px)">
          <Heading size="md" textAlign="center">{widgetName}</Heading>
          <VStack
            divider={<Divider borderColor="gray.600" />}
            spacing={4}
            align="stretch"
            flex={1}
            justify="center"
          >
            {[1, 2, 3].map((i) => (
              <HStack key={i} justify="space-between" px={4}>
                <Text fontSize="lg">Placeholder</Text>
                <Text fontSize="2xl" fontWeight="bold">-- --</Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      )}

      {/* Error overlay */}
      <Center
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(27, 33, 59, 0.95)"
        backdropFilter="blur(8px)"
        zIndex={10}
      >
        <VStack spacing={4} textAlign="center">
          <Box
            fontSize="48px"
            color="red.400"
            mb={2}
          >
            ⚠️
          </Box>
          <Heading size="md" color="white">
            Data Fetch Error
          </Heading>
          <Text color="gray.300" maxW="200px" fontSize="sm">
            {message}
          </Text>
          <Text color="gray.500" fontSize="xs">
            Please check your connection
          </Text>
        </VStack>
      </Center>
    </DashboardCard>
  );
};

export default DashboardCardErrorOverlay;
