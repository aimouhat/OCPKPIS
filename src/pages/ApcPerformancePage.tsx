import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag";
import SemiCircleGaugeWidget from "../components/widgets/SemiCircleGaugeWidget";

const ApcPerformancePage = () => {
    return (
        <VStack spacing={6} align="stretch" p={6}>
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>APC Performance Assessment KPI</Heading>
            </Box> 

            <VStack spacing={6} align="stretch" p={6}>  
                <Box>
                    <Grid
                        templateColumns="repeat(5, 1fr)" // Creates 3 equal-width columns
                        gap={6}
                    > 
                        <GridItem colSpan={{ base: 5, xl: 1 }}>
                            <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>
                                <Heading size="md" mb={4} textAlign="center" >Tailing & Thickening (Aveva)</Heading>  
                                <VStack h="100%" spacing={4} align="stretch"> 
                                    <SemiCircleGaugeWidget
                                            widgetName="Online Time"
                                            label="Online Time"
                                            tagName="PlantA_ID_APC_Aveva_OnlineTime"
                                            apiType="API_Actual" 
                                            unit="%"
                                        />
                                    <SemiCircleGaugeWidget
                                        widgetName="Utilization"
                                        label="Utilization"
                                        tagName="PlantA_ID_APC_Aveva_Utilization"
                                        apiType="API_Actual"
                                        timePeriodInHours={24}
                                        unit="%"
                                    /> 
                                </VStack> 
                            </Box> 
                        </GridItem>

                        <GridItem colSpan={{ base: 5, xl: 1 }}>
                            <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>
                                <Heading size="md" mb={4} textAlign="center" >Classification (ABB)</Heading>  
                                <VStack h="100%" spacing={4} align="stretch"> 
                    <SemiCircleGaugeWidget
                        widgetName="Online Time"
                        label="Online Time"
                        tagName="PlantA_ID_APC_ABB_OnlineTime"
                        apiType="API_Actual"
                        timePeriodInHours={24}
                        unit="%"
                    />
                    <SemiCircleGaugeWidget
                        widgetName="Utilization"
                        label="Utilization"
                        tagName="PlantA_ID_APC_ABB_Utilization"
                        apiType="API_Actual"
                        timePeriodInHours={24}
                        unit="%"
                    />
                                </VStack> 
                            </Box> 
                        </GridItem>
                        
                        <GridItem colSpan={{ base: 5, xl: 1 }}>
                            <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>
                                <Heading size="md" mb={4} textAlign="center" >Flotation (FLS)</Heading>  
                                <VStack h="100%" spacing={4} align="stretch"> 
                    <SemiCircleGaugeWidget
                        widgetName="Online Time"
                        label="Online Time"
                        tagName="PlantA_ID_APC_FLS_OnlineTime"
                        apiType="API_Actual"
                        timePeriodInHours={24}
                        unit="%"
                    />
                    <SemiCircleGaugeWidget
                        widgetName="Utilization"
                        label="Utilization"
                        tagName="PlantA_ID_APC_FLS_Utilization"
                        apiType="API_Actual"
                        timePeriodInHours={24}
                        unit="%"
                    />
                                </VStack> 
                            </Box> 
                        </GridItem>

                        <GridItem colSpan={{ base: 5, xl: 1 }}>
                            <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>
                                <Heading size="md" mb={4} textAlign="center" >Scrubbing (Honeywell)</Heading>  
                                <VStack h="100%" spacing={4} align="stretch"> 
                    <SemiCircleGaugeWidget
                        widgetName="Online Time"
                        label="Online Time"
                        tagName="PlantA_ID_APC_HWLProfiloop_OnlineTime"
                        apiType="API_Actual"
                        timePeriodInHours={24}
                        unit="%"
                    />
                    <SemiCircleGaugeWidget
                        widgetName="Utilization"
                        label="Utilization"
                        tagName="PlantA_ID_APC_HWLProfiloop_Utilization"
                        apiType="API_Actual"
                        timePeriodInHours={24}
                        unit="%"
                    />
                                </VStack> 
                            </Box> 
                        </GridItem>

                        <GridItem colSpan={{ base: 5, xl: 1 }}>
                            <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>
                                <Heading size="md" mb={4} textAlign="center" >Plant Wide Opt (Honeywell)</Heading>  
                                <VStack h="100%" spacing={4} align="stretch"> 
                    <SemiCircleGaugeWidget
                        widgetName="Online Time"
                        label="Online Time"
                        tagName="PlantA_ID_APC_HWLPWO_OnlineTime"
                        apiType="API_Actual"
                        timePeriodInHours={24}
                        unit="%"
                    /> 
                     <SemiCircleGaugeWidget
                        widgetName="Utilization"
                        label="Utilization"
                        tagName="PlantA_ID_APC_HWLPWO_Utilization"
                        apiType="API_Actual"
                        timePeriodInHours={24}
                        unit="%"
                    />
                                </VStack> 
                            </Box> 
                        </GridItem>



                    </Grid>


                </Box> 
                
                </VStack> 




            <Grid templateColumns="repeat(10, 1fr)" gap={6}>
                {/* --- Gauge Widgets --- */}
                <GridItem colSpan={{ base: 10, sm: 5, md: 2 }}>

                </GridItem>
                <GridItem colSpan={{ base: 10, sm: 5, md: 2 }}>

                </GridItem>
                
                 <GridItem colSpan={{ base: 10, sm: 5, md: 2 }}>

                </GridItem>
                <GridItem colSpan={{ base: 10, sm: 5, md: 2 }}>

                </GridItem>
                 <GridItem colSpan={{ base: 10, sm: 5, md: 2 }}>

                </GridItem>
                <GridItem colSpan={{ base: 10, sm: 5, md: 2 }}>

                </GridItem>
                <GridItem colSpan={{ base: 10, sm: 5, md: 2 }}>

                </GridItem>
                 <GridItem colSpan={{ base: 10, sm: 5, md: 2 }}>

                </GridItem>
                 <GridItem colSpan={{ base: 10, sm: 5, md: 2 }}>

                </GridItem>
                
                {/* --- Trend Widget --- */}
                <GridItem colSpan={10}>
                    <TrendSeries_MultiTag
                        widgetName="APC KPI Trends"
                        timePeriodInHours={24}
                        tagNames={[
                            "PlantA_ID_APC_HWLPWO_ModelAccuracy", "PlantA_ID_APC_HWLPWO_OnlineTime", "PlantA_ID_APC_HWLPWO_TimeConstrained", "PlantA_ID_APC_HWLPWO_Utilization",
                            "PlantA_ID_APC_ABB_ModelAccuracy", "PlantA_ID_APC_ABB_OnlineTime", "PlantA_ID_APC_ABB_TimeConstrained", "PlantA_ID_APC_ABB_Utilization",
                            "PlantA_ID_APC_FLS_ModelAccuracy", "PlantA_ID_APC_FLS_OnlineTime", "PlantA_ID_APC_FLS_TimeConstrained", "PlantA_ID_APC_FLS_Utilization",
                            "PlantA_ID_APC_HWLProfiloop_ModelAccuracy", "PlantA_ID_APC_HWLProfiloop_OnlineTime", "PlantA_ID_APC_HWLProfiloop_TimeConstrained", "PlantA_ID_APC_HWLProfiloop_Utilization",
                            "PlantA_ID_APC_Aveva_ModelAccuracy", "PlantA_ID_APC_Aveva_OnlineTime", "PlantA_ID_APC_Aveva_TimeConstrained", "PlantA_ID_APC_Aveva_Utilization"
                        ]}
                        trendNames={[
                            "PWO Model Accuracy", "PWO Online Time", "PWO Time Constrained", "PWO Utilization",
                            "ABB Model Accuracy", "ABB Online Time", "ABB Time Constrained", "ABB Utilization",
                            "FLS Model Accuracy", "FLS Online Time", "FLS Time Constrained", "FLS Utilization",
                            "Profitloop Model Accuracy", "Profitloop Online Time", "Profitloop Time Constrained", "Profitloop Utilization",
                            "Aveva Model Accuracy", "Aveva Online Time", "Aveva Time Constrained", "Aveva Utilization"
                        ]}
                    />
                </GridItem>
            </Grid>
        </VStack>
    );
};

export default ApcPerformancePage;
