import React from 'react';
import { Heading, VStack, Grid, GridItem, Text, Box } from "@chakra-ui/react";
import { useKpiData } from '../../hooks/useKpiData';
import DashboardCard from '../common/DashboardCard';
import DashboardCardSkeleton from '../common/DashboardCardSkeleton';
import DashboardCardErrorMessage from '../common/DashboardCardErrorMessage';
import { type ApiType } from '../../types';

// Defines the properties for a single item to be placed in the grid
interface GridItemSpec {
    label: string;
    tagName: string;
    unit?: string;
    // The cell position, e.g., "3.2" for row 3, column 2
    cell: string;
}

interface Props {
    widgetName: string;
    items: GridItemSpec[];
    apiType: Extract<ApiType, "API_Actual" | "API_Aggregated">;
    timePeriodInHours?: number;
}

const Grid_KPI_Cell_Layout = ({ widgetName, items, apiType, timePeriodInHours }: Props) => {
    const tagNames = items.map(item => item.tagName);

    const { data, isLoading, error } = useKpiData({
        apiType,
        tagNames,
        timePeriodInHours,
    });

    if (isLoading) return <DashboardCardSkeleton h={300} />;
    if (error || !data) return <DashboardCardErrorMessage />;

    // Determine grid dimensions from the cell specs
    let maxRow = 0;
    let maxCol = 0;
    items.forEach(item => {
        const [row, col] = item.cell.split('.').map(Number);
        if (row > maxRow) maxRow = row;
        if (col > maxCol) maxCol = col;
    });

    return (
        <DashboardCard>
            <VStack align="stretch" spacing={4}>
                <Heading size="md" textAlign="center">{widgetName}</Heading>
                <Grid
                    templateRows={`repeat(${maxRow}, 1fr)`}
                    templateColumns={`repeat(${maxCol}, 1fr)`}
                    gap={4}
                    p={4}
                    border="1px solid"
                    borderColor="gray.700"
                    borderRadius="md"
                >
                    {items.map((item) => {
                        const [row, col] = item.cell.split('.').map(Number);
                        const record = data.find(d => d.tagname === item.tagName);
                        const displayValue = record ? `${record.value.toFixed(2)} ${item.unit || ''}`.trim() : "N/A";

                        return (
                            <GridItem key={item.tagName} gridRowStart={row} gridColumnStart={col} >
                                <VStack
                                    p={2}
                                    bg="gray.800"
                                    borderRadius="md"
                                    h="100%"
                                    justify="center"
                                >
                                    <Text fontSize="sm" color="gray.400" textAlign="center">{item.label}</Text>
                                    <Text fontSize="xl" fontWeight="bold" textAlign="center">{displayValue}</Text>
                                </VStack>
                            </GridItem>
                        );
                    })}
                </Grid>
            </VStack>
        </DashboardCard>
    );
};

export default Grid_KPI_Cell_Layout;

