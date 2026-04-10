import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag";
import RadarChart_Act_Targ from "../components/widgets/RadarChart_Act_Targ";
import Widget_SingleValue from "../components/widgets/Widget_SingleValue";
import Grid_KPI from "../components/widgets/Grid_KPI";

const GlobalPlantKpiPage = () => {

    const getTimeRange = (period: string): { startTime?: string; endTime?: string } => {
        const now = new Date();
        let startTime: Date;
        
        if (period === "Current Shift") {
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
            return { startTime: currentShiftStart.toISOString(), endTime: now.toISOString() };
        }
        
        if (period === "Month") {
            startTime = new Date(now.getFullYear(), now.getMonth(), 1);
            return { startTime: startTime.toISOString(), endTime: now.toISOString() };
        }
        
        return {};
    };


    return (
        <VStack spacing={4} align="stretch" p={4} w="100%">
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6} size="lg">Global Plant KPI</Heading>
            </Box>

                        <VStack spacing={4} align="stretch" w="100%">
                <Box w="100%">
                    <Grid
                        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                        gap={4}
                        w="100%"
                    >
                        <GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
                            <Widget_SingleValue
                                widgetName="Plant Input Cost KPIs"
                                apiType="API_Aggregated"
                                {...getTimeRange("Current Shift")}
                                items={[
                                    { label: "Amine Consumption", tagName: "PlantA_OUT_SpecificAmineConsumption", unit: "g/t" },
                                    { label: "Flocculant Consumption", tagName: "PlantA_OUT_SpecificFlocullantConsumption", unit: "g/t" },
                                    { label: "Phosphoric Acid", tagName: "PlantA_OUT_SpecificPhoAcidConsumption", unit: "g/t" },
                                    { label: "Phosphoric Ester", tagName: "PlantA_OUT_SpecificPhoEsterConsumption", unit: "g/t" },
                                    { label: "Energy Consumption", tagName: "PlantA_OUT_SpecificEnergyConsumption", unit: "kWt/t" },
                                    { label: "Water Consumption", tagName: "PlantA_OUT_SpecificWaterConsumption", unit: "kL/t" }
                                ]}
                            />
                        </GridItem>

                        <GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
                            <VStack h="100%" spacing={3} align="stretch">

                                <Widget_SingleValue
                                    widgetName="Plant Output Feed Rate"
                                    apiType="API_Aggregated"
                                    {...getTimeRange("Current Shift")}
                                    items={[
                                        { label: "Actual", tagName: "PlantA_OUT_Out_W", unit: "tph" },
                                        { label: "Target", tagName: "PlantA_ID_Target_Out_W", unit: "tph" }
                                    ]}
                                />

                                <Widget_SingleValue
                                    widgetName="Last Shift Production"
                                    apiType="API_Aggregated"
                                    {...getTimeRange("Current Shift")}
                                    items={[
                                        { label: "Total Inlet", tagName: "PlantA_OUT_In_TotalPrOUT_W", unit: "t" },
                                        { label: "Total Outlet", tagName: "PlantA_OUT_Out_TotalPrOUT_W", unit: "t" }
                                    ]}
                                /> 
                            </VStack> 
                        </GridItem>

                        <GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
                            <Widget_SingleValue
                                widgetName="Plant Input Feed Rate"
                                apiType="API_Aggregated"
                                {...getTimeRange("Current Shift")}
                                items={[
                                    { label: "Actual", tagName: "PlantA_OUT_In_W", unit: "tph" },
                                    { label: "Target", tagName: "PlantA_ID_Target_In_W", unit: "tph" }
                                ]}
                            />
                        </GridItem>

                        <GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
                            <RadarChart_Act_Targ
                                widgetName="Raw Ore Quality"
                                axisNames={["BPL", "CaO", "Cd", "CO2", "H2O", "MgO", "SiO2"]}
                                actualTagNames={[
                                    "PlantA_ID_FeedRawOre_Conce_BPL", "PlantA_ID_FeedRawOre_Conce_CaO",
                                    "PlantA_ID_FeedRawOre_Conce_Cd", "PlantA_ID_FeedRawOre_Conce_CO2",
                                    "PlantA_ID_FeedRawOre_Conce_H2O", "PlantA_ID_FeedRawOre_Conce_MgO",
                                    "PlantA_ID_FeedRawOre_Conce_SiO2"
                                ]}
                                targetTagNames={[]} // No targets specified
                            />
                        </GridItem>

                        <GridItem colSpan={{ base: 1, md: 1, lg: 1 }}> 
                            <RadarChart_Act_Targ
                                widgetName="Final Phosphate Product Quality"
                                axisNames={["BPL", "CaO", "Cd", "CO2", "H2O", "MgO", "SiO2"]}
                                actualTagNames={[
                                    "PlantA_ID_Out_FinalProduct_Conce_BPL", "PlantA_ID_Out_FinalProduct_Conce_CaO",
                                    "PlantA_ID_Out_FinalProduct_Conce_Cd", "PlantA_ID_Out_FinalProduct_Conce_CO2",
                                    "PlantA_ID_Out_FinalProduct_Conce_H2O", "PlantA_ID_Out_FinalProduct_Conce_MgO",
                                    "PlantA_ID_Out_FinalProduct_Conce_SiO2"
                                ]}
                                targetTagNames={[]} // No targets specified
                            />
                        </GridItem> 

                    </Grid> 
                </Box> 
            </VStack>

            <Grid templateColumns="repeat(12, 1fr)" gap={6}> 
                <GridItem colSpan={{ base: 12, xl: 2 }}>
                    <VStack h="100%" spacing={4} align="stretch">
                        <Widget_SingleValue
                            widgetName="Plant Import Feed Rate"
                            apiType="API_Aggregated"
                            {...getTimeRange("Current Shift")}
                            items={[
                                { label: "Actual", tagName: "PlantA_OUT_In_W", unit: "t" },
                                { label: "Target", tagName: "PlantA_ID_Target_Import_W", unit: "t" }
                            ]}
                        />

                        <Widget_SingleValue
                            widgetName="Plant Export Feed Rate"
                            apiType="API_Aggregated"
                            {...getTimeRange("Current Shift")}
                            items={[
                                { label: "Actual", tagName: "PlantA_OUT_Export_W", unit: "t" },
                                { label: "Target", tagName: "PlantA_ID_Target_Export_W", unit: "t" }
                            ]}
                        />

                    </VStack>


                </GridItem>

                <GridItem colSpan={{ base: 12, xl: 10 }}>
                    <TrendSeries_MultiTag
                        widgetName="Estimate Final Product Phosphate Content (%)"
                        tagNames={["PlantA_OUT_FinalPrOUT_Phosphate"]}
                        trendNames={["Estimated Content"]}
                        {...getTimeRange("Month")}
                        apiType="API_Aggregated"
                    />

                </GridItem>
                

            </Grid>

            {/* KPI Grid Table with Time Periods */}
            <GridItem w="100%">
                <Grid_KPI
                    widgetName="KPI AVG based on aggregated data" 
                    apiType="API_Aggregated"
                    rowNames={[
                        "Overall Yield weight Scrubbing/Screening [%]",
                        "Overall Yield by weight Classification [%]",
                        "Overall Yield by weight Flotation [%]",
                        "Specific Water consumption [m3/t dry phosphate]",
                        "Specific Energy consumption [kWt/t dry phosphate]",
                        "Specific Ester consumption [g/t dry phosphate]",
                        "Specific Acid consumption [g/t dry phosphate]",
                        "Specific Amine consumption [g/t dry phosphate]",
                        "Specific Flocculant consumption [g/t dry phosphate]",
                        "Screening Efficiency (Inf,3150um) in the coarse reject [%]"
                    ]}
                    columnConfigs={[
                        { name: "Last 1 hr" },
                        { name: "Last 4 hr" },
                        { name: "Last 24 hr" },
                        { name: "Current shift (to now)" },
                    ]}
                    cellTags={[
                        ["PlantA_OUT_ScrubbingScreeningMassYield_OnlineTOTAL", "PlantA_OUT_ScrubbingScreeningMassYield_Last4H", "PlantA_OUT_ScrubbingScreeningMassYield_Last24H_TOTAL", "PlantA_OUT_ScrubbingScreeningMassYield_CurrentShift"],
                        ["OUT_ClassificationMassYield_OnlineTOTAL", "OUT_ClassificationMassYield_Last4H", "OUT_ClassificationMassYield_Last24H_TOTAL", "PlantA_OUT_ClassificationMassYield_CurrentShift"],
                        ["OUT_FlotationMassYield_OnlineTOTAL", "OUT_FlotationMassYield_Last4H", "OUT_FlotationMassYield_Last24H_TOTAL", "PlantA_OUT_FlotationMassYield_CurrentShift"],
                        ["PlantA_OUT_SpecificWaterConsumption_OnlineTOTAL", "PlantA_OUT_SpecificWaterConsumption_Last4H", "PlantA_OUT_SpecificWaterConsumption_Last24H_TOTAL", "PlantA_OUT_SpecificWaterConsumption_CurrentShift"],
                        ["PlantA_OUT_SpecificEnergyConsumption_OnlineTOTAL", "PlantA_OUT_SpecificEnergyConsumption_Last4H", "PlantA_OUT_SpecificEnergyConsumption_Last24H_TOTAL", "PlantA_OUT_SpecificEnergyConsumption_CurrentShift"],
                        ["PlantA_OUT_SpecificPhoEsterConsumption_OnlineTOTAL", "PlantA_OUT_SpecificPhoEsterConsumption_Last4H", "PlantA_OUT_SpecificPhoEsterConsumption_Last24H_TOTAL", "PlantA_OUT_SpecificPhoEsterConsumption_CurrentShift"],
                        ["PlantA_OUT_SpecificPhoAcidConsumption_OnlineTOTAL", "PlantA_OUT_SpecificPhoAcidConsumption_Last4H", "PlantA_OUT_SpecificPhoAcidConsumption_Last24H_TOTAL", "PlantA_OUT_SpecificPhoAcidConsumption_CurrentShift"],
                        ["PlantA_OUT_SpecificAmineConsumption_OnlineTOTAL", "PlantA_OUT_SpecificAmineConsumption_Last4H", "PlantA_OUT_SpecificAmineConsumption_Last24H_TOTAL", "PlantA_OUT_SpecificAmineConsumption_CurrentShift"],
                        ["PlantA_OUT_SpecificFlocullantConsumption_OnlineTOTAL", "PlantA_OUT_SpecificFlocullantConsumption_Last4H", "PlantA_OUT_SpecificFlocullantConsumption_Last24H_TOTAL", "PlantA_OUT_SpecificFlocullantConsumption_CurrentShift"],
                        ["OUT_ScreeningEff3150CoarseReject_OnlineTOTAL", "OUT_ScreeningEff3150CoarseReject_Last4H", "OUT_ScreeningEff3150CoarseReject_Last24H_TOTAL", "OUT_ScreeningEff3150CoarseReject_CurrentShift"]
                    ]}
                />
            </GridItem>
 
        </VStack>
    );
};

export default GlobalPlantKpiPage;
