import { Box, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useKpiData } from "../../hooks/useKpiData";
import DashboardCard from "../common/DashboardCard";
import DashboardCardSkeleton from "../common/DashboardCardSkeleton";
import DashboardCardErrorMessage from "../common/DashboardCardErrorMessage";

interface StockItem {
    label: string;
    tagName: string;
    unit: string;
}

interface Props {
  widgetName: string;
  items: StockItem[];
}

const Widget_Stockyard = ({ widgetName, items }: Props) => {
  const tagNames = items.map(item => item.tagName);
  const { data, isLoading, error } = useKpiData({
    apiType: "API_Actual",
    tagNames,
  });

  if (isLoading) return <DashboardCardSkeleton />;
  if (error || !data) return <DashboardCardErrorMessage />;

  const findValue = (tagName: string) => {
    const record = data.find(d => d.tagname === tagName);
    return record ? record.value.toFixed(2) : "N/A";
  };

  return (
    <DashboardCard>
      <Heading size="md" mb={4}>{widgetName}</Heading>
      <SimpleGrid columns={2} spacing={4} h="100%">
        {items.map(item => (
            <VStack key={item.tagName} bg="blackAlpha.300" p={4} borderRadius="md" justify="center">
                <Text fontSize="lg" color="gray.400" textAlign="center">{item.label}</Text>
                <Text fontSize="4xl" fontWeight="bold">
                    {findValue(item.tagName)}
                    <Text as="span" fontSize="xl" color="gray.500" ml={2}>
                        {item.unit}
                    </Text>
                </Text>
            </VStack>
        ))}
      </SimpleGrid>
    </DashboardCard>
  );
};

export default Widget_Stockyard;