import { Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useKpiData } from "../../hooks/useKpiData";
import DashboardCard from "../common/DashboardCard";
import DashboardCardSkeleton from "../common/DashboardCardSkeleton";
import DashboardCardErrorMessage from "../common/DashboardCardErrorMessage";

interface Tile {
    name: string;
    tagName: string;
}

interface Props {
    widgetName: string;
    ColumnNumbers: number;
    tiles: Tile[];
}

const HeatMapChart = ({ 
        widgetName, 
        ColumnNumbers, 
        tiles 
    }: Props) => {

    const tagNames = tiles.map(t => t.tagName); 
    const { data, isLoading, error } = useKpiData({
        apiType: "API_Actual",
        tagNames,
    });

    if (isLoading) return <DashboardCardSkeleton h={200} />;
    if (error || !data) return <DashboardCardErrorMessage />;

    const findValue = (tagName: string) => data.find(d => d.tagname === tagName)?.value ?? -1;

    // A function to get the color and status text based on the value
    const getStatus = (value: number) => {
        if (value >= 0.8) return { color: "green.600", text: "Running" }; // Running for 1 or higher
        if ((value >= 0) && (value < 0.8)) return { color: "red.600", text: "Not Running" };   // Not Running
        if ((value >= -1) && (value < 0) ) return { color: "gray.600", text: "Tag Issue" };   // Tag Not available
        if (value < -1) return { color: "yellow.600", text: "Inbet" };   // Inbet
        return { color: "gray.600", text: "Unknown" }; // Unknown status
    };

    return (
        // THE FIX: Set the card and VStack to use full height
        <DashboardCard h="100%">
            <VStack h="100%" align="stretch">
                <Heading size="md" mb={4}>{widgetName}</Heading>
                
                {/* THE FIX: Add flex={1} to allow the grid to grow vertically */}
                <SimpleGrid columns={ColumnNumbers} spacing={4} flex={1}>
                    {tiles.map(tile => {
                        const value = findValue(tile.tagName);
                        const status = getStatus(value);
                        
                        return (
                            // THE FIX: Set tile height to 100% to fill the grid cell
                            <VStack
                                key={tile.tagName}
                                bg={status.color}
                                p={3}
                                borderRadius="lg"
                                justify="center"
                                align="center"
                                h="100%"
                                boxShadow="md"
                            >
                                <Text fontSize="md" fontWeight="bold" color="white" textAlign="center" noOfLines={2}>
                                    {tile.name}
                                </Text>

                                <Text fontSize="sm" color="white" opacity={0.9}>
                                    {status.text}
                                </Text>
                            </VStack>
                        )
                    })}
                </SimpleGrid>
            </VStack>
        </DashboardCard>
    );
};

export default HeatMapChart;
