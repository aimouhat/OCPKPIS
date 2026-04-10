import {
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    VStack,
} from "@chakra-ui/react";
import { useKpiData } from "../../hooks/useKpiData";
import DashboardCard from "../common/DashboardCard";
import DashboardCardSkeleton from "../common/DashboardCardSkeleton";
import DashboardCardErrorMessage from "../common/DashboardCardErrorMessage";

// Define the shape of a single item/row for this widget
interface TableItem {
    label: string;      // The name of the parameter to display in the first column
    tagName: string;    // The SQL tag name to fetch data for
    unit?: string;      // Optional unit to display next to the value
}

interface Props {
    widgetName: string;
    items: TableItem[];
}

const TableWithTimeStamp = ({ widgetName, items }: Props) => {
    // Extract all tag names to make a single API call
    const tagNames = items.map(item => item.tagName);

    // Use the custom data fetching hook with the new API type
    const { data, isLoading, error } = useKpiData({
        apiType: "API_LastUpdated",
        tagNames: tagNames,
    });

    // Display a loading state while fetching data
    if (isLoading) return <DashboardCardSkeleton h={200} />;
    // Display an error message if the fetch fails
    if (error || !data) return <DashboardCardErrorMessage />;

    
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


    // Helper function to find the corresponding data for a given tag name
    const findRecord = (tagName: string) => {
        return data.find(d => d.tagname === tagName);
    };

    // Helper function to format the timestamp into a more readable string
    const formatTimestamp = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleString(); // Formats to local date and time, e.g., "9/3/2025, 1:15:30 PM"
    };

    return (
        <DashboardCard>
            <VStack align="stretch" spacing={4}>
                <Heading size="md">{widgetName}</Heading>
                <TableContainer>
                    <Table variant="simple" size="sm">
                        <Thead>
                            <Tr>
                                <Th>Parameter</Th>
                                <Th isNumeric>Value</Th>
                                <Th>Time Stamp</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {items.map((item) => {
                                const record = findRecord(item.tagName);
                                const displayValue = record ? `${formatValue(record.value)} ${item.unit || ''}`.trim() : "N/A";
                                const displayTimestamp = record ? formatTimestamp(record.timestamp) : "N/A";

                                return (
                                    <Tr key={item.tagName}>
                                        <Td>{item.label}</Td>
                                        <Td isNumeric>{displayValue}</Td>
                                        <Td>{displayTimestamp}</Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </VStack>
        </DashboardCard>
    );
};

export default TableWithTimeStamp;
