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
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag";
import Widget_SingleValue from "../components/widgets/Widget_SingleValue";
import Grid_KPI_Cell_Layout from "../components/widgets/Grid_KPI_Cell_Layout";
import BarChart from "../components/widgets/BarChart";
import DowntimeStackedColumnWidget from "../components/widgets/DowntimeStackedColumnWidget";
import PieChartWidget from "../components/widgets/PieChartWidget";

const ManagementInDetailPage = () => {
	
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

    // Items for the "BPP Product Quality" Grid
    const productQualityItems = [
        { label: "Moisture", tagName: "RL2_ID_Moist", cell: "1.2" },
        { label: "Al2O3", tagName: "RL2_ID_Al2O3", cell: "1.4" },
        { label: "Fe2O3", tagName: "RL2_ID_Fe2O3", cell: "1.5" },
        { label: "CaO", tagName: "RL2_ID_CaO", cell: "1.6" },
        { label: "MgO", tagName: "RL2_ID_MgO", cell: "1.7" },
        { label: "K2O", tagName: "RL2_ID_K2O", cell: "1.9" },
        { label: "Na2O", tagName: "RL2_ID_Na2O", cell: "1.10" },
        { label: "BPL", tagName: "RL2_ID_BPL", cell: "1.11" },
        { label: "CO2", tagName: "RL2_ID_CO2", cell: "1.12" },
        { label: "Cd", tagName: "RL2_ID_Cd", cell: "1.14" },
        { label: "P2O5", tagName: "RL2_ID_P2O5", cell: "2.11" },
        { label: "SiO2", tagName: "RL2_ID_SiO2", cell: "2.13" },
        { label: "SO3", tagName: "RL2_ID_SO3", cell: "2.14" },
    ];

    // Items for "Plant Input Cost KPIs"
    const costKpiItems = [
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
    ];

    // Items for "Stockyard KPI"
    const stockyardItems = [
        { label: "Product Reclaimer Current Capacity", tagName: "140G_RC_01_OUT_CurrentCapacityPercentage", unit: "%" },
        { label: "Ore Reclaimer Current Capacity", tagName: "120G_RC_01_OUT_CurrentCapacityPercentage", unit: "%" },
    ];


    return (
        <VStack spacing={6} align="stretch" p={6}>
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>Management in Detail</Heading>
            </Box>
            
            <Box>
                <Grid
                    templateColumns="repeat(5, 1fr)" // Creates 3 equal-width columns
                    gap={6}
                    > 
                        <GridItem colSpan={{ base: 2, xl: 2 }}>
							<BarChart
								widgetName="Accumulated Feed, Tonnes (Monthly)"
								apiType="API_Aggregated"
								timePeriodInHours={720} // Approx 1 month
								items={[
									{ label: "Plant Export", tagName: "140G_RC_01_OUT_Out_Dry_W" },
									{ label: "Plant Import", tagName: "110G_ST_01_OUT_Out_Dry_W" },
									{ label: "Plant Input", tagName: "210A_SB_01_OUT_Out_Dry_W" },
									{ label: "Plant Output", tagName: "130G_ST_01_OUT_Out_Dry_W" },
								]}
							/> 
				        </GridItem> 
                        
                        <GridItem colSpan={{ base: 2, xl: 2 }}>
                                    <DowntimeStackedColumnWidget
                                        widgetName="Plant A Lines"
                                        assetNames={assetNames_Lines}
                                        startTime={startTime.toISOString()}
                                        endTime={endTime.toISOString()}
                                    /> 
                        </GridItem> 
			
                        <GridItem colSpan={{ base: 1, xl: 1 }}>
                            <Widget_SingleValue
                                widgetName="Plant Input Cost KPIs"
                                apiType="API_Actual"
                                timePeriodInHours={1} // "1h"
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

            <Box>
                <Grid
                            templateColumns="repeat(6, 1fr)" // Creates 3 equal-width columns
                            gap={6}
                        >

                            
                <GridItem colSpan={{ base: 2, xl: 2 }}>
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
                        timePeriodInHours={720} // "Month"
                    /> 
                </GridItem>
                
                <GridItem colSpan={{ base: 2, xl: 2 }}>
                    <TrendSeries_MultiTag
                        widgetName="Phosphate Mass Rate (t/h)"
                        tagNames={[
                            "Coarse_Reject_Handling_Area_OUT_AreaFeedRate",
                            "PlantA_OUT_In_W",
                            "400A_TH_01_OUT_Out_Heavy_Dry_W"
                        ]}
                        trendNames={[
                            "Loss to Gangue Feed Rate,t/h",
                            "Plant Input Feed Rate ,t/h",
                            "Thickener Underflow Feed Rate ,t/h"
                        ]}
                        timePeriodInHours={720} // "Month"
                    />
                </GridItem>
                
                <GridItem colSpan={{ base: 1, xl: 1 }}>
                    <Widget_SingleValue
                        widgetName="Stockyard KPI"
                        apiType="API_Aggregated"
                        timePeriodInHours={720} // "Month"
                        items={stockyardItems}
                    />
                </GridItem>
				
				<GridItem colSpan={{ base: 1, xl: 1 }}>
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

                </Grid>     


            </Box>
			 
			 
        </VStack>
    );
};

export default ManagementInDetailPage;