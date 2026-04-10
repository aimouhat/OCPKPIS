import {
    Heading,
    VStack,
    HStack,
    Text,
    Divider,
    Box
} from "@chakra-ui/react";
import { useKpiData } from "../../hooks/useKpiData";
import DashboardCard from "../common/DashboardCard";
import DashboardCardSkeleton from "../common/DashboardCardSkeleton";
import DashboardCardErrorOverlay from "../common/DashboardCardErrorOverlay";
import type { ApiType } from "../../types";

// Defines the structure for each KPI item to be displayed in the widget.
interface KpiItem {
    label: string;
    tagName: string;
    unit?: string; // Optional unit to display next to the value
}

interface Props {
    widgetName: string;
    items: KpiItem[];
    apiType: "API_Actual" | "API_Aggregated";
    timePeriodInHours?: number;
    startTime?: string;
    endTime?: string;
}

const Widget_SingleValue = ({
    widgetName,
    items,
    apiType,
    timePeriodInHours,
    startTime,
    endTime
}: Props) => {
    // Extract all tag names from the items array to make a single API call.
    const tagNames = items.map(item => item.tagName); 
    
    // Use the central data fetching hook.
    const { data, isLoading, error } = useKpiData({
        apiType,
        tagNames,
        timePeriodInHours,
        startTime,
        endTime,
    });
    

    // Handle loading and error states.
    if (isLoading) return <DashboardCardSkeleton h="100%" />;
    if (error || !data) return <DashboardCardErrorOverlay widgetName={widgetName} />;

    
    // 2. HELPER: Safe Value Formatter
    // This is the fix for the NULL crash
    const formatValue = (val: any) => {
        // Case A: Database sent explicit NULL or didn't send the field
        if (val === null || val === undefined) {
            return "N/A"; 
        }
        
        // Case B: Database sent a valid number (e.g. 50.123)
        const num = Number(val);
        if (!isNaN(num)) {
            return num.toFixed(2); // Format to 2 decimal places
        }

        // Case C: Database sent a string that isn't a number (e.g. "Error")
        return String(val);
    };

    // Helper function to find the value for a specific tag from the fetched data.
    const findValue = (tagName: string) => {

        
        const record = data.find(d => d.tagname === tagName);
        return record ? formatValue(record.value) : "N/A";
    };

    return (
        <DashboardCard h="100%">
            <VStack h="100%" align="stretch" spacing={4}>
                <Heading size="md" textAlign="center">{widgetName}</Heading>
                <VStack
                    divider={<Divider borderColor="gray.600" />}
                    spacing={4}
                    align="stretch"
                    flex={1}
                    justify="center"
                >
                    {items.map((item) => (
                        <HStack key={item.tagName} justify="space-between" px={4}>
                            <Text fontSize="lg" color="gray.300">{item.label}</Text>
                            <Text fontSize="2xl" fontWeight="bold">
                                {findValue(item.tagName)}
                                {item.unit && <Box as="span" fontSize="md" ml={1} color="gray.400">{item.unit}</Box>}
                            </Text>
                        </HStack>
                    ))}
                </VStack>
            </VStack>
        </DashboardCard>
    );
};

export default Widget_SingleValue;
