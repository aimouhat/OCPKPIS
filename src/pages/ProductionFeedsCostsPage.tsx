import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react"; 
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons"; 
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag";
import RadarChart_Act_Targ from "../components/widgets/RadarChart_Act_Targ";
import Grid_KPI from "../components/widgets/Grid_KPI";

const ProductionFeedsCostsPage = () => {
    
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

    return (
        <VStack spacing={6} align="stretch" p={6}>

            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to OCP Portal
                </Button>
                <Heading ml={6}>Production - Feeds, Costs</Heading>
            </Box> 


            {/*      */}
            <Grid
                templateColumns="repeat(2, 1fr)"
                gap={6}
            > 
                <GridItem >
                    <VStack h="100%" spacing={4} align="stretch">

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


                    </VStack>
                </GridItem> 


                <GridItem >
                    <VStack h="100%" spacing={4} align="stretch">
                    <RadarChart_Act_Targ
                            widgetName="Production Feeds monitoring [t/h] (Current)"
                            axisNames={[ 
                                "Prod Delivery", 
                            "Import", 
                            "Plant Out", 
                            "Export", 
                            "Plant In"
                            ]}
                            actualTagNames={[
                                "RL4_OUT_Out_Dry_W",
                                "110G_ST_01_OUT_Out_Dry_W",
                                "130G_ST_01_OUT_Out_Dry_W",
                                "140G_RC_01_OUT_Out_Dry_W",
                                "210A_SB_01_OUT_Out_Dry_W",
                            ]}
                            targetTagNames={[
                                "RL4_Target_Dry_W",
                                "110G_ST_01_ID_M_Target_W",
                                "130G_ST_01_ID_M_Target_W",
                                "140G_RC_01_ID_M_Target_W",
                                "210A_SB_01ID_Target_Dry_W",
                            ]}
                    />

                    </VStack> 
                </GridItem> 
                </Grid>
                
                <Box>
                    <Grid
                            templateColumns="repeat(3, 1fr)" // Creates 4 equal-width columns
                            gap={6}
                        >
                        <GridItem>
                            <VStack h="100%" spacing={4} align="stretch">
                                <TrendSeries_MultiTag 
                                widgetName="Plant Amine Specific Consumption, g/t dry phosphate" 
                                tagNames={["PlantA_OUT_SpecificAmineConsumption"]} 
                                trendNames={["Level A, %"]} 
                                timePeriodInHours={24} />
                            </VStack>
                        </GridItem>
                        <GridItem>
                            <VStack h="100%" spacing={4} align="stretch">
                                <TrendSeries_MultiTag 
                                widgetName="Plant Flocullant Specific Consumption, g/t dry phosphate" 
                                tagNames={["PlantA_OUT_SpecificFlocullantConsumption"]} 
                                trendNames={["Level A, %"]} 
                                timePeriodInHours={24} />
                            </VStack>
                        </GridItem>
                        <GridItem>
                            <VStack h="100%" spacing={4} align="stretch">
                                <TrendSeries_MultiTag 
                                widgetName="Plant Phosphoric Acid Specific Consumption, g/t dry phosphate" 
                                tagNames={["PlantA_OUT_SpecificPhoAcidConsumption"]} 
                                trendNames={["Level A, %"]} 
                                timePeriodInHours={24} />
                            </VStack>

                        
                        </GridItem> 

                    </Grid>

                </Box>
                

                <Box>
                    <Grid
                            templateColumns="repeat(3, 1fr)" // Creates 4 equal-width columns
                            gap={6}
                        > 
                        <GridItem>
                            <TrendSeries_MultiTag 
                            widgetName="Plant Phosphoric Ester Specific Consumption, g/t dry phosphate" 
                            tagNames={["PlantA_OUT_SpecificPhoEsterConsumption"]} 
                            trendNames={["Level A, %"]} 
                            timePeriodInHours={24} />
                        </GridItem> 
                        <GridItem>
                            <TrendSeries_MultiTag 
                            widgetName="Plant Specific Energy Consumption, kWt/t dry phosphate" 
                            tagNames={["PlantA_OUT_SpecificEnergyConsumption"]} 
                            trendNames={["Level A, %"]} 
                            timePeriodInHours={24} />
                        </GridItem>
                        <GridItem>
                            <TrendSeries_MultiTag 
                            widgetName="Plant Specific Water Consumption, m3/t dry phosphate" 
                            tagNames={["PlantA_OUT_SpecificWaterConsumption"]} 
                            trendNames={["Level A, %"]} 
                            timePeriodInHours={24} />
                        </GridItem> 

                    </Grid>

                </Box> 
                        
                
        </VStack>
    );
};

export default ProductionFeedsCostsPage;
