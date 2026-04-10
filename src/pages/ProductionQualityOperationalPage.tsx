import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import PieChartWidget from "../components/widgets/PieChartWidget";
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag";
import Widget_SingleValue from "../components/widgets/Widget_SingleValue";
import DowntimeStackedColumnWidget from "../components/widgets/DowntimeStackedColumnWidget";


const ProductionQualityOperationalPage = () => {
    const assetNames_Lines = [
        "Inload_Stacking_Line", 
        "Inload_Reclaiming_Line", 
        "Main_Plant_Line", 
        "Outload_Reclaiming_Line", 
        "Outload_Delivery_Line", 
    ];
    
    const endTime = new Date();
    const startTime = new Date();
    startTime.setDate(endTime.getDate() - 14); // 2 weeks (14 days) before now


    return (
        <VStack spacing={6} align="stretch" p={6}>
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="grey" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>Production - Quality, Operational</Heading>
            </Box>

            <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                <GridItem colSpan={{ base: 12, md: 3, lg: 3 }}>
                    <PieChartWidget
                        widgetName="Final Product Quality_Lab. ManualImput[%] and (Normalized[%])"
                        apiType="API_Actual"
                        items={[
                            { label: "BPL", tagName: "PlantA_ID_Out_M_FinalProduct_Conce_BPL" },
                            { label: "CaO", tagName: "PlantA_ID_Out_M_FinalProduct_Conce_CaO" },
                            { label: "Cd", tagName: "PlantA_ID_Out_M_FinalProduct_Conce_Cd" },
                            { label: "CO2", tagName: "PlantA_ID_Out_M_FinalProduct_Conce_CO2" },
                            { label: "MgO", tagName: "PlantA_ID_Out_M_FinalProduct_Conce_MgO" },
                            { label: "SiO2", tagName: "PlantA_ID_Out_M_FinalProduct_Conce_SiO2" },
                            { label: "H2O", tagName: "PlantA_ID_Out_M_FinalProduct_Conce_H2O" },
                        ]}
                    />
                </GridItem>

            

                <GridItem colSpan={{ base: 12, md: 6, lg: 3 }}>
                    <TrendSeries_MultiTag
                        widgetName="Stockyard KPI"
                        tagNames={["120G_RC_01_OUT_SY_CurrentCapacity","120G_RC_01_OUT_SY_CurrentCapacityPercentage","140G_RC_01_OUT_SY_CurrentCapacity","140G_RC_01_OUT_SY_CurrentCapacityPercentage"]}
                        trendNames={["Ore Reclaimer Capacity, Tonnes","Ore Reclaimer Capacity, %","Product Reclaimer Capacity, Tonnes","Product Reclaimer Capacity, %"]}
                        timePeriodInHours={8} // Month
                    />
                </GridItem>

                <GridItem colSpan={{ base: 12, md: 6, lg: 3 }}>
                    <TrendSeries_MultiTag
                        widgetName="Estimate Final Product Phosphate Content (%)"
                        tagNames={["PlantA_OUT_FinalPrOUT_Phosphate"]}
                        trendNames={["Estimated Final Product Phosphate Content, %"]}
                        timePeriodInHours={720} // Month
                    />
                </GridItem>

                <GridItem colSpan={{ base: 12, md: 6, lg: 3 }}>
                    <TrendSeries_MultiTag
                        widgetName="Phosphate (%)"
                        tagNames={[
                            "Coarse_Reject_Handling_Area_ID_M_Sterile_Conce_BPL",
                            "Scrubbing_and_Screening_Area_ID_Out_M_Conce_BPL",
                            "Tailings_Thickener_&_Flocculant_Preparation_ID_M_Decanter_Conce_BPL"
                        ]}
                        trendNames={[
                            "Loss to Gangue D BPL % Content",
                            "Phosphate Input BPL % Content",
                            "Thickener Underflow BPL % Content"
                        ]}
                        timePeriodInHours={720} // Month
                    />
                </GridItem>


            </Grid>

            <Grid templateColumns="repeat(12, 1fr)" gap={6}>

                <GridItem colSpan={{ base: 12, md: 5, lg: 4 }}>
                    <TrendSeries_MultiTag
                        widgetName="Phosphate Mass Rates (t/h)"
                        tagNames={[
                            "210A_SC01_Out_Dry_W",
                            "210A_SB_01_OUT_Out_Dry_W",
                            "400A_TH_01_OUT_Out_Heavy_Dry_W"
                        ]}
                        trendNames={[
                            "Loss to Gangue Feed Rate, t/h",
                            "Phosphate Input Mass Rate, t/h",
                            "Thickener Underflow Mass Rate, t/h"
                        ]}
                        timePeriodInHours={720} // Month
                    />
                </GridItem>
                
                
                <GridItem colSpan={{ base: 12, md: 7, lg: 6 }}>
                            <DowntimeStackedColumnWidget
                                widgetName="Plant A Lines"
                                assetNames={assetNames_Lines}
                                startTime={startTime.toISOString()}
                                endTime={endTime.toISOString()}
                            /> 
                </GridItem> 

            </Grid>

            
        </VStack>
    );
};

export default ProductionQualityOperationalPage;
