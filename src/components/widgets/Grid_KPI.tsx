import {
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";
import { useState, useEffect } from "react"; 
import { fetchKpiData } from "../../api/kpi";
import type { KpiRecord } from "../../types";
import DashboardCard from "../common/DashboardCard";
import DashboardCardSkeleton from "../common/DashboardCardSkeleton";
import DashboardCardErrorMessage from "../common/DashboardCardErrorMessage";

// This is a generic, reusable Grid KPI widget.
// It is configured via props to display aggregated data for multiple tags over multiple time periods.

// Configuration for each column, defining its name and the time range to fetch.
interface ColumnConfig {
    name: string;
    timeConfig?: {
        timePeriodInHours?: number;
        startTime?: string;
        endTime?: string;
    };
}

interface Props {
    widgetName: string;
    rowNames: string[];       // The labels for each row.
    columnConfigs: ColumnConfig[]; // The configuration for each column.
    cellTags: string[][];     // A 2D array mapping each cell to a tag name.
    apiType?: "API_Actual" | "API_Aggregated"; // Optional prop to control how many rows 
}

// Type alias for the grid data: An array of columns, where each column is an array of records or null.
type GridData = (KpiRecord[] | null)[];

const Grid_KPI = ({ 
        widgetName, 
        rowNames, 
        columnConfigs, 
        cellTags, 
        apiType = "API_Aggregated"
    }: Props) => {
        
    const [data, setData] = useState<GridData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchAllData = async () => {

            try {
                setIsLoading(true);
                // For efficiency, we make one API call per column, fetching all necessary tags for that time period.
                const promises = columnConfigs.map(config => {
                    // Get all unique tags needed for this column.
                    const tagsForColumn = cellTags.map(row => row[columnConfigs.indexOf(config)]).filter(tag => tag);
                    
                    return fetchKpiData({
                        apiType: apiType,
                        tagNames: tagsForColumn,
                        ...config.timeConfig,
                    });
                });

                // Use Promise.allSettled to handle cases where one time period might fail (e.g., no data)
                const settledResults = await Promise.allSettled(promises);

                const processedData = settledResults.map(result => {
                    if (result.status === 'fulfilled') {
                        return result.value;
                    } else {
                        console.error("A single data fetch for a column failed:", result.reason);
                        return null; // Mark this column's data as failed
                    }
                });

                setData(processedData);

            } catch (e) {
                console.error("An unexpected error occurred during data fetching:", e);
                setError(e as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, [widgetName, rowNames, columnConfigs, cellTags, apiType]); // Re-fetch if the component is re-used with a different config

    if (isLoading) return <DashboardCardSkeleton h={220} />;
    if (error) return <DashboardCardErrorMessage />;

    const findValue = (colIndex: number, tagName: string) => {
        const columnData = data ? data[colIndex] : null;
        if (!columnData) return "N/A"; // Handle case where this column's fetch failed
        
        const record = columnData.find(d => d.tagname === tagName);
        return (record && typeof record.value === 'number') ? record.value.toFixed(2) : "N/A";
    };

    return (
        <DashboardCard h="100%">
            <Heading size="md" mb={4}>{widgetName}</Heading>
            <TableContainer>
                <Table variant="simple" size="sm">
                    <Thead>
                        <Tr>
                            <Th>KPI</Th>
                            {columnConfigs.map((col) => (
                                <Th key={col.name} isNumeric>{col.name}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {rowNames.map((rowName, rowIndex) => (
                            <Tr key={rowName}>
                                <Td>{rowName}</Td>
                                {columnConfigs.map((_, colIndex) => (
                                    <Td key={colIndex} isNumeric>
                                        {findValue(colIndex, cellTags[rowIndex][colIndex])}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </DashboardCard>
    );
};

export default Grid_KPI;
