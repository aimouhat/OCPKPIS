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
import Widget_SingleValue from "../components/widgets/Widget_SingleValue";

const EngineeringRatesCostsApcPage = () => { 

    return (
        <VStack spacing={6} align="stretch" p={6}>
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>Engineering - Rates, Costs, APC</Heading>
            </Box>
 

                <Box> 
                    
                    <Grid
                        templateColumns="repeat(3, 1fr)" // Creates 3 equal-width columns
                        gap={6}
                    >
                        <GridItem>
                            <PieChartWidget
                                widgetName="APC Controller Online Time , %"
                                apiType="API_Aggregated"
                                timePeriodInHours={12}
                                items={[
                                    { label: "ABB", tagName: "PlantA_ID_APC_ABB_OnlineTime" },
                                    { label: "Aveva", tagName: "PlantA_ID_APC_Aveva_OnlineTime" },
                                    { label: "FLS", tagName: "PlantA_ID_APC_FLS_OnlineTime" },
                                    { label: "HWL Profiloop", tagName: "PlantA_ID_APC_HWLProfiloop_OnlineTime" },
                                    { label: "HWL PWO", tagName: "PlantA_ID_APC_HWLPWO_OnlineTime" },
                                ]}
                            />
                        </GridItem>  
        
                        <GridItem>
                            <PieChartWidget
                                widgetName="APC Controller Time Constrained"
                                apiType="API_Aggregated"
                                timePeriodInHours={12}
                                items={[
                                    { label: "ABB", tagName: "PlantA_ID_APC_ABB_TimeConstrained" },
                                    { label: "Aveva", tagName: "PlantA_ID_APC_Aveva_TimeConstrained" },
                                    { label: "FLS", tagName: "PlantA_ID_APC_FLS_TimeConstrained" },
                                    { label: "HWL Profiloop", tagName: "PlantA_ID_APC_HWLProfiloop_TimeConstrained" },
                                    { label: "HWL PWO", tagName: "PlantA_ID_APC_HWLPWO_TimeConstrained" },
                                ]}
                            />
                        </GridItem>
        
                        <GridItem>
                            <PieChartWidget
                                widgetName="APC Controller Utilization , %"
                                apiType="API_Aggregated"
                                timePeriodInHours={12}
                                items={[
                                    { label: "ABB", tagName: "PlantA_ID_APC_ABB_Utilization" },
                                    { label: "Aveva", tagName: "PlantA_ID_APC_Aveva_Utilization" },
                                    { label: "FLS", tagName: "PlantA_ID_APC_FLS_Utilization" },
                                    { label: "HWL Profiloop", tagName: "PlantA_ID_APC_HWLProfiloop_Utilization" },
                                    { label: "HWL PWO", tagName: "PlantA_ID_APC_HWLPWO_Utilization" },
                                ]}
                            />
                        </GridItem> 
                    </Grid>

                </Box>

                <Box> 
                    <Grid
                        templateColumns="repeat(5, 1fr)" // Creates 3 equal-width columns
                        gap={6}
                    > 
                    <GridItem colSpan={{ base: 4, xl: 4 }}>
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
                    
                    <GridItem colSpan={{ base: 1, xl: 1 }}>
                        <Widget_SingleValue
                            widgetName="KPI" 
                            apiType="API_Actual" 
                            items={[
                                { label: "Plant Amine Specific Consumption", 
                                    tagName: "PlantA_OUT_SpecificAmineConsumption_OnlineTOTAL", unit: "g/t dry phosphate" },
                                { label: "Plant Flocculant Specific Consumption", 
                                    tagName: "PlantA_OUT_SpecificFlocullantConsumption_OnlineTOTAL", unit: "g/t dry phosphate" }, // Tag from spec
                                { label: "Plant Phosphoric Acid Specific Consumption", 
                                    tagName: "PlantA_OUT_SpecificPhoAcidConsumption_OnlineTOTAL", unit: "g/t dry phosphate" },
                                { label: "Plant Phosphoric Ester Specific Consumption", 
                                    tagName: "PlantA_OUT_SpecificPhoEsterConsumption_OnlineTOTAL", unit: "g/t dry phosphate" },
                                { label: "Plant Specific Energy Consumption", 
                                    tagName: "PlantA_OUT_SpecificEnergyConsumption_OnlineTOTAL", unit: "kWt/t dry phosphate" },
                                { label: "Plant Specific Water Consumption", 
                                    tagName: "PlantA_OUT_SpecificWaterConsumption_OnlineTOTAL", unit: "m3/t dry phosphate" },
                            ]}
                        />




                    </GridItem> 

                    </Grid>


                </Box>
  





 
        </VStack>
    );
};

export default EngineeringRatesCostsApcPage;