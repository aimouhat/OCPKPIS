import {
    Box,
    Button,
    Grid,
    GridItem,
    Heading,
    VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import PieChartWidget from "../components/widgets/PieChartWidget";
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag";
import RadarChart_Act_Targ from "../components/widgets/RadarChart_Act_Targ";
import Widget_SingleValue from "../components/widgets/Widget_SingleValue";

const EngineeringPage = () => {



    return (
        <VStack spacing={6} align="stretch" p={6}>
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>Engineering Dashboard</Heading>
            </Box>

            <VStack spacing={6} align="stretch" p={6}>
                <Box>
                <VStack spacing={6} align="stretch" p={6}>

                    
                <Grid
                        templateColumns="repeat(4, 2fr)" // Creates 4 equal-width columns
                        gap={7}
                    > 
                    <GridItem colSpan={{ base: 1, md: 1, xl: 1 }}>
                        <TrendSeries_MultiTag
                        widgetName="Plant Input Feed Rate, t/h (24h)"
                        tagNames={["PlantA_OUT_In_W", "PlantA_OUT_In_W_Target"]}
                        trendNames={["Actual", "Target"]}
                        timePeriodInHours={24}
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
                            templateColumns="repeat(5, 1fr)" // Creates 4 equal-width columns
                            gap={6}
                        >
                        <GridItem colSpan={{ base: 5, xl: 1 }}>
                            <PieChartWidget
                                widgetName="ABB Ability Expert Optimizer for Classification process."
                                apiType="API_Aggregated"
                                timePeriodInHours={12}
                                items={[
                                    { label: "APC Controller Online Time , %", tagName: "PlantA_ID_APC_ABB_OnlineTime" },
                                    { label: "APC Controller Time Constrained ", tagName: "PlantA_ID_APC_ABB_TimeConstrained" },
                                    { label: "APC Controller Utilization , %", tagName: "PlantA_ID_APC_ABB_Utilization" },
                                ]}
                            />
                        </GridItem>
        
                        <GridItem colSpan={{ base: 5, xl: 1 }}>
                            <PieChartWidget
                                widgetName="Aveva APC for tailing & Thickening process"
                                apiType="API_Aggregated"
                                timePeriodInHours={12}
                                items={[
                                    { label: "APC Controller Online Time , %", tagName: "PlantA_ID_APC_Aveva_OnlineTime" },
                                    { label: "APC Controller Time Constrained ", tagName: "PlantA_ID_APC_Aveva_TimeConstrained" },
                                    { label: "APC Controller Utilization , %", tagName: "PlantA_ID_APC_Aveva_Utilization" },
                                ]}
                            />
                        </GridItem>
        
                        <GridItem colSpan={{ base: 5, xl: 1 }}>
                            <PieChartWidget
                                widgetName="FLS-APC Expert system (TBC) for flotation process"
                                apiType="API_Aggregated"
                                timePeriodInHours={12}
                                items={[
                                    { label: "APC Controller Online Time , %", tagName: "PlantA_ID_APC_FLS_OnlineTime" },
                                    { label: "APC Controller Time Constrained ", tagName: "PlantA_ID_APC_FLS_TimeConstrained" },
                                    { label: "APC Controller Utilization , %", tagName: "PlantA_ID_APC_FLS_Utilization" },
                                ]}
                            />
                        </GridItem>
        
                        <GridItem colSpan={{ base: 5, xl: 1 }}>
                            <PieChartWidget
                                widgetName="Honeywell APC Profitloop for Scrubbing& Screening process"
                                apiType="API_Aggregated"
                                timePeriodInHours={12}
                                items={[
                                    { label: "APC Controller Online Time , %", tagName: "PlantA_ID_APC_HWLProfiloop_OnlineTime" },
                                    { label: "APC Controller Time Constrained ", tagName: "PlantA_ID_APC_HWLProfiloop_TimeConstrained" },
                                    { label: "APC Controller Utilization , %", tagName: "PlantA_ID_APC_HWLProfiloop_Utilization" },
                                ]}
                            />
                        </GridItem>
        
                        <GridItem colSpan={{ base: 5, xl: 1 }}>
                            <PieChartWidget
                                widgetName="Honeywell L3 BBP PWO- APC Plant Wide Optimizer"
                                apiType="API_Aggregated"
                                timePeriodInHours={12}
                                items={[
                                    { label: "APC Controller Online Time , %", tagName: "PlantA_ID_APC_HWLPWO_OnlineTime" },
                                    { label: "APC Controller Time Constrained ", tagName: "PlantA_ID_APC_HWLPWO_TimeConstrained" },
                                    { label: "APC Controller Utilization , %", tagName: "PlantA_ID_APC_HWLPWO_Utilization" },
                                ]}
                            />
                        </GridItem> 

                    </Grid> 

                    <Grid
                            templateColumns="repeat(5, 1fr)" // Creates 4 equal-width columns
                            gap={6}
                        >
                        <GridItem colSpan={{ base: 5, xl: 2 }}>
                            <TrendSeries_MultiTag
                                widgetName="APC Controller Model Errors"
                                tagNames={[
                                    "PlantA_ID_APC_ABB_ModelAccuracy",
                                    "PlantA_ID_APC_Aveva_ModelAccuracy",
                                    "PlantA_ID_APC_FLS_ModelAccuracy",
                                    "PlantA_ID_APC_HWLProfiloop_ModelAccuracy",
                                    "PlantA_ID_APC_HWLPWO_ModelAccuracy"
                                ]}
                                trendNames={[
                                    "ABB Ability Expert Optimizer",
                                    "Aveva APC for tailing & Thickening",
                                    "FLS-APC Expert system (TBC)",
                                    "Honeywell APC Profitloop",
                                    "Honeywell L3 BBP PWO- APC"
                                ]}
                                timePeriodInHours={12}
                            />
                        </GridItem> 

                        <GridItem colSpan={{ base: 5, xl: 1 }}>
                            <Widget_SingleValue
                                widgetName="Classification Area Mass Yield"
                                apiType="API_Aggregated"                                
                                timePeriodInHours={12}
                                items={[
                                    { label: "Classification Area Mass Yield", tagName: "Classification_Area_OUT_ClassificationMassYield", unit: "%" }, 
                                ]} /> 
                        </GridItem>  

                        <GridItem colSpan={{ base: 5, xl: 2}}>
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
                </VStack>



                </Box> 
            </VStack> 
        </VStack>
    );
};

export default EngineeringPage;