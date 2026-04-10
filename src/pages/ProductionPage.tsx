import {
    Box,
    Button,
    Grid,
    GridItem,
    SimpleGrid,
    Heading,
    VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag"; 
import Grid_KPI from "../components/widgets/Grid_KPI";
import Widget_SingleValue from "../components/widgets/Widget_SingleValue"; 
import DowntimeStackedColumnWidget from "../components/widgets/DowntimeStackedColumnWidget";
 


const ProductionPage = () => {
    
    const assetNames_Lines = [
        "Inload_Stacking_Line", 
        "Inload_Reclaiming_Line", 
        "Main_Plant_Line", 
        "Outload_Reclaiming_Line", 
        "Outload_Delivery_Line", 
    ];

    
    const getTimeRange = (period: string): { timePeriodInHours?: number; startTime?: string; endTime?: string } => {
        const now = new Date();
        let startTime: Date, endTime: Date;

        const today6am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0, 0);
        const today6pm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0, 0);
        
        let currentShiftStart: Date;
        if (now >= today6pm) {
            currentShiftStart = today6pm;
        } else if (now >= today6am) {
            currentShiftStart = today6am;
        } else {
            currentShiftStart = new Date(today6pm.getTime() - 24 * 60 * 60 * 1000);
        }
        
        const lastShiftEnd = currentShiftStart;
        const lastShiftStart = new Date(lastShiftEnd.getTime() - 12 * 60 * 60 * 1000);
        const dayStart = new Date(lastShiftEnd.getTime() - 24 * 60 * 60 * 1000);

        switch (period) {
            case "Current shift":
                return { startTime: currentShiftStart.toISOString(), endTime: now.toISOString() };
            case "Last shift":
                return { startTime: lastShiftStart.toISOString(), endTime: lastShiftEnd.toISOString() };
            case "Day":
                return { startTime: dayStart.toISOString(), endTime: lastShiftEnd.toISOString() };
            case "Month to Date":
                startTime = new Date(now.getFullYear(), now.getMonth(), 1);
                return { startTime: startTime.toISOString(), endTime: now.toISOString() };
            case "Year to Date":
                startTime = new Date(now.getFullYear(), 0, 1);
                return { startTime: startTime.toISOString(), endTime: now.toISOString() };
            default:
                return { timePeriodInHours: 1 }; // Fallback
        }
    };

    const endTime_DT = new Date();
    const startTime_DT = new Date();
    startTime_DT.setDate(endTime_DT.getDate() - 14); // 2 weeks (14 days) before now



    return (
        <VStack spacing={6} align="stretch" p={6}>
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>Production Dashboard</Heading>
            </Box>

            <VStack spacing={6} align="stretch" p={6}>
                <Box>
                <VStack h="100%" spacing={4} align="stretch">
                    
                <Grid
                        templateColumns="repeat(4, 2fr)" // Creates 4 equal-width columns
                        gap={7}
                    > 
                    <GridItem colSpan={{ base: 1, md: 1, xl: 1 }}>
                        <TrendSeries_MultiTag
                        widgetName="Plant Input Feed Rate, t/h (12h)"
                        tagNames={["PlantA_OUT_In_W", "PlantA_OUT_In_W_Target"]}
                        trendNames={["Actual", "Target"]}
                        timePeriodInHours={12}
                        />
                    </GridItem>
    
                    <GridItem colSpan={{ base: 1, md: 1, xl: 1 }}>
                        <TrendSeries_MultiTag
                        widgetName="Plant Output Feed Rate, t/h (12h)"
                        tagNames={["PlantA_OUT_Out_W", "PlantA_OUT_Out_W_Target"]}
                        trendNames={["Actual", "Target"]}
                        timePeriodInHours={12}
                        />
                    </GridItem>
    
        
                    <GridItem colSpan={{ base: 1, md: 1, xl: 1 }}>
                        <TrendSeries_MultiTag
                        widgetName="Export Feed Rate, t/h (12h)"
                        tagNames={["PlantA_OUT_Export_W", "PlantA_ID_PlantA_Export_W_Target"]}
                        trendNames={["Actual", "Target"]}
                        timePeriodInHours={12}
                        />
                    </GridItem>
    
                    <GridItem colSpan={{ base: 1, md: 1, xl: 1 }}>
                        <TrendSeries_MultiTag
                        widgetName="Import Feed Rate, t/h (12h)"
                        tagNames={["PlantA_OUT_Import_W", "PlantA_ID_PlantA_Import_W_Target"]}
                        trendNames={["Actual", "Target"]}
                        timePeriodInHours={12}
                        />
                    </GridItem> 

                </Grid>

                <Grid
                        templateColumns="repeat(4, 2fr)" // Creates 4 equal-width columns
                        gap={7}
                    >
                    <GridItem colSpan={{ base: 2, md: 2, xl: 2 }}>
                        <DowntimeStackedColumnWidget
                            widgetName="Plant A Lines"
                            assetNames={assetNames_Lines}
                            startTime={startTime_DT.toISOString()}
                            endTime={endTime_DT.toISOString()}
                        /> 
                    </GridItem> 


                    <GridItem colSpan={{ base: 1, md: 1, xl: 1 }}>
                        <Widget_SingleValue
                            widgetName="Stockyards Product Available"
                            apiType="API_Actual"
                            items={[
                                { label: "Ore Reclaimer Current Capacity", tagName: "120G_RC_01_OUT_SY_CurrentCapacityPercentage", unit: "%" },
                                { label: "Ore Reclaimer Current Capacity", tagName: "120G_RC_01_OUT_SY_CurrentCapacity", unit: "tonnes" },
                                { label: "Product Reclaimer Current Capacity", tagName: "140G_RC_01_OUT_SY_CurrentCapacityPercentage", unit: "%" },
                                { label: "Product Reclaimer Current Capacity", tagName: "140G_RC_01_OUT_SY_CurrentCapacity", unit: "t/h" },
                            ]}
                        />
                    </GridItem> 

                    <GridItem colSpan={{ base: 1, md: 1, xl: 1 }}>
                        <Grid_KPI
                            widgetName="Plant Accumulated Feed [Tonns]"
                            rowNames={[
                                "Plant Input Feed", "Plant Output Feed",
                                "Export Feed", "Import Feed"
                            ]}
                            columnConfigs={[
                                { name: "Current shift", timeConfig: getTimeRange("Current shift") },
                                { name: "Last shift", timeConfig: getTimeRange("Last shift") },
                                { name: "Day", timeConfig: getTimeRange("Day") },
                                { name: "Month to Date", timeConfig: getTimeRange("Month to Date") },
                                { name: "Year to Date", timeConfig: getTimeRange("Year to Date") },
                            ]}
                            cellTags={[
                                ["210A_SB_01_OUT_Out_Dry_W", "210A_SB_01_OUT_Out_Dry_W", "210A_SB_01_OUT_Out_Dry_W", "210A_SB_01_OUT_Out_Dry_W", "210A_SB_01_OUT_Out_Dry_W"],
                                ["130G_ST_01_OUT_Out_Dry_W", "130G_ST_01_OUT_Out_Dry_W", "130G_ST_01_OUT_Out_Dry_W", "130G_ST_01_OUT_Out_Dry_W", "130G_ST_01_OUT_Out_Dry_W"],
                                ["140G_RC_01_OUT_Out_Dry_W", "140G_RC_01_OUT_Out_Dry_W", "140G_RC_01_OUT_Out_Dry_W", "140G_RC_01_OUT_Out_Dry_W", "140G_RC_01_OUT_Out_Dry_W"],
                                ["110G_ST_01_OUT_Out_Dry_W", "110G_ST_01_OUT_Out_Dry_W", "110G_ST_01_OUT_Out_Dry_W", "110G_ST_01_OUT_Out_Dry_W", "110G_ST_01_OUT_Out_Dry_W"],
                            ]}
                        />
                        
                    </GridItem>

                </Grid>

                </VStack>


                    
 
                </Box>

                
            </VStack>

 
        </VStack>
    );
};

export default ProductionPage;