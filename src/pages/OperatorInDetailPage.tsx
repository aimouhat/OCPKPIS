import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag";
import HeatMapChart from "../components/widgets/HeatMapChart";
import Grid_KPI from "../components/widgets/Grid_KPI";

const OperatorInDetailPage = () => {
    
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
                return { startTime: dayStart.toISOString(), 
                    endTime: lastShiftEnd.toISOString() };
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

    return (
        <VStack spacing={6} align="stretch" p={6}>

            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to OCP Portal
                </Button>
                <Heading ml={6}>Operator in Detail</Heading>
            </Box>


            {/*      */}
            <Grid
                templateColumns="repeat(12, 1fr)"
                gap={6}
            >
                {/* --- TOP ROW: Main Data Widgets --- */}
                <GridItem colSpan={{ base: 12, xl: 7 }}>
                    <Grid_KPI
                        widgetName="Plant Accumulated Feed [Tonns]"
                        rowNames={[
                            "Plant Input Feed", 
                            "Plant Output Feed",
                            "Export Feed", 
                            "Import Feed"
                        ]}
                        columnConfigs={[
                            { name: "Current shift", timeConfig: getTimeRange("Current shift") },
                            { name: "Last shift", timeConfig: getTimeRange("Last shift") },
                            { name: "2 Completed Shifts", timeConfig: getTimeRange("Day") },
                            { name: "Month to Date", timeConfig: getTimeRange("Month to Date") },
                            { name: "Year to Date", timeConfig: getTimeRange("Year to Date") },
                        ]}
                        cellTags={[
                            ["PlantA_OUT_In_W", "PlantA_OUT_In_W", "PlantA_OUT_In_W", "PlantA_OUT_In_W", "PlantA_OUT_In_W"],
                            ["PlantA_OUT_Out_W", "PlantA_OUT_Out_W", "PlantA_OUT_Out_W", "PlantA_OUT_Out_W", "PlantA_OUT_Out_W"],
                            ["PlantA_OUT_Export_W", "PlantA_OUT_Export_W", "PlantA_OUT_Export_W", "PlantA_OUT_Export_W", "PlantA_OUT_Export_W"],
                            ["PlantA_OUT_Import_W", "PlantA_OUT_Import_W", "PlantA_OUT_Import_W", "PlantA_OUT_Import_W", "PlantA_OUT_Import_W"],
                        ]}
                    />
                </GridItem>

                <GridItem colSpan={{ base: 12, md: 3, xl: 5 }}>
                    <HeatMapChart
                        widgetName="Lines Status"
                        ColumnNumbers = {5}
                        tiles={[
                            { name: "Inload Stacking Line", tagName: "Inload_Stacking_Line_Status" },
                            { name: "Inload Reclaiming Line", tagName: "Inload_Reclaiming_Line_Status" },
                            { name: "Main Plant Line", tagName: "Main_Plant_Line_Status" },
                            { name: "Outload Reclaiming Line", tagName: "Outload_Reclaiming_Line_Status" },
                            { name: "Outload Delivery Line", tagName: "Outload_Delivery_Line_Status" },
                        ]}
                    />
                </GridItem> 

                {/* --- BOTTOM ROW: All Trend Widgets --- */}
                <GridItem colSpan={12}>
                     <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                        <GridItem colSpan={{ base: 12, lg: 6, xl: 4}}>
                             <TrendSeries_MultiTag
                                widgetName="Feed Rate, t/h (12h)"
                                tagNames={[
                                    "120G_RC_01_OUT_Out_Dry_W", "140G_RC_01_OUT_Out_Dry_W",
                                    "210A_SB_01_OUT_Out_Dry_W", "CT2_D_OUT_Out_Dry_W"
                                ]}
                                trendNames={[
                                    "Inload Reclaimer", "Outload Reclaimer", "Scrubber", "Coarse ore to Spreader"
                                ]}
                                timePeriodInHours={12}
                            />
                        </GridItem>
                        <GridItem colSpan={{ base: 12, lg: 6, xl: 4}}>
                            <TrendSeries_MultiTag
                                widgetName="Stockyard KPI, % (Month)"
                                tagNames={[
                                    "120G_RC_01_OUT_SY_CurrentCapacityPercentage",
                                    "140G_RC_01_OUT_SY_CurrentCapacityPercentage"
                                ]}
                                trendNames={["Inload Stockyards", "Outload Stockyards"]}
                                timePeriodInHours={720}
                            />
                        </GridItem>
                        <GridItem colSpan={{ base: 12, lg: 12, xl: 4}}>
                             <TrendSeries_MultiTag
                                widgetName="Estimated Final Product Phosphate Content, % (Month)"
                                tagNames={["PlantA_OUT_FinalPrOUT_Phosphate"]}
                                trendNames={["Product Phosphate Cont"]}
                                timePeriodInHours={720}
                            />
                        </GridItem>
                     </Grid>
                </GridItem>
                
                {/* --- TANK LEVELS ROW (FULL WIDTH) --- */}
                <GridItem colSpan={12}>
                    <Heading size="md" mb={4}>Tank Levels, % (2 weeks)</Heading>
                    <Grid templateColumns="repeat(6, 1fr)" gap={4}>
                        <TrendSeries_MultiTag widgetName="310A-TK-01" tagNames={["310A_TK_01_ID_LVLA"]} trendNames={["Level"]} timePeriodInHours={360} />
                        <TrendSeries_MultiTag widgetName="310A-PB-02" tagNames={["310A_PB_02_ID_LVLA"]} trendNames={["Level"]} timePeriodInHours={360} />
                        <TrendSeries_MultiTag widgetName="310A-PB-03" tagNames={["310A_PB_03_ID_LVLA"]} trendNames={["Level"]} timePeriodInHours={360} />
                        <TrendSeries_MultiTag widgetName="310A-PB-04" tagNames={["310A_PB_04_ID_LVLA"]} trendNames={["Level"]} timePeriodInHours={360} />
                        <TrendSeries_MultiTag widgetName="320A-PB-01" tagNames={["320A_PB_01_ID_LVLA"]} trendNames={["Level"]} timePeriodInHours={360} />
                        <TrendSeries_MultiTag widgetName="320A-PB-02" tagNames={["320A_PB_02_ID_LVLA"]} trendNames={["Level"]} timePeriodInHours={360} />
                    </Grid>
                </GridItem>
            </Grid>
        </VStack>
    );
};

export default OperatorInDetailPage;
