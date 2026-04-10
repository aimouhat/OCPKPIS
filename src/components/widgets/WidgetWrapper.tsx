import React from 'react';
import { Box, Heading, Skeleton, Text, useColorModeValue, Center } from '@chakra-ui/react';

interface WidgetWrapperProps {
  title: string;
  isLoading: boolean;
  error?: string | null;
  noData?: boolean;
  children: React.ReactNode;
  minH?: string | number;
}

const WidgetWrapper: React.FC<WidgetWrapperProps> = ({ title, isLoading, error, noData, children, minH = "250px" }) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md" bg={bgColor} borderColor={borderColor} minH={minH}>
      <Heading size="sm" mb={4} noOfLines={1} title={title}>
        {title}
      </Heading>
      {isLoading ? (
        <Skeleton height={minH} />
      ) : error ? (
        <Center height={minH}>
          <Text color="red.500">Error: {error}</Text>
        </Center>
      ) : noData ? (
         <Center height={minH}>
          <Text>No data available.</Text>
        </Center>
      ) : (
        children
      )}
    </Box>
  );
};

export default WidgetWrapper;