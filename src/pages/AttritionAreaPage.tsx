import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag";
import HeatMapChart from "../components/widgets/HeatMapChart";
import Widget_SingleValue from "../components/widgets/Widget_SingleValue";

const AttritionAreaPage = () => {
    return (
        <Box p={6}>
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>310-Attrition Area Dashboard</Heading>
            </Box>


            <VStack spacing={6} align="stretch" p={6}>
                {/* --- UPPER PART (4 Columns) --- */} 
                <Box> 
                    <Grid
                        templateColumns="repeat(4, 1fr)" // Creates 4 equal-width columns
                        gap={6}
                    >
                        <GridItem>
                            <VStack h="100%" spacing={4} align="stretch">
                            <Widget_SingleValue widgetName="310A-AC Attrition Cells KPIs" apiType="API_Actual" items={[
                                { label: "Cell Dry Feed Mass Rate", tagName: "310A_AC_OUT_In_W", unit: "t/h" },
                                { label: "Cell Solids Concentration", tagName: "310A_CY_01_ID_In_SolidConcentration", unit: "t/m3" },
                                { label: "Slimes Generation", tagName: "Attrition_and_Flotation_Area_ID_Out_M_SlimesGeneration", unit: "%" },
                                { label: "Solids Feed Size Range", tagName: "310A_AC_ID_In_M_Size", unit: "%" },
                                { label: "Solids Residence Time", tagName: "310A_AC_OUT_Residence_Time", unit: "min" },
                                { label: "Specific Energy Consumption", tagName: "310A_AC_OUT_SpecificEnergyConsumption", unit: "kWt/t" },
                            ]} />

                            <HeatMapChart widgetName="Agitator drive status" ColumnNumbers={4}
                            tiles={[
                                { name: "310A-AG-01", tagName: "310A_AC_01_04_OUT_Agitator_Status1" }, { name: "310A-AG-02", tagName: "310A_AC_01_04_OUT_Agitator_Status2" },
                                { name: "310A-AG-03", tagName: "310A_AC_01_04_OUT_Agitator_Status3" }, { name: "310A-AG-04", tagName: "310A_AC_01_04_OUT_Agitator_Status4" },
                                { name: "310A-AG-05", tagName: "310A_AC_05_08_OUT_Agitator_Status5" }, { name: "310A-AG-06", tagName: "310A_AC_05_08_OUT_Agitator_Status6" },
                                { name: "310A-AG-07", tagName: "310A_AC_05_08_OUT_Agitator_Status7" }, { name: "310A-AG-08", tagName: "310A_AC_05_08_OUT_Agitator_Status8" },
                                { name: "310A-AG-09", tagName: "310A_AC_09_12_OUT_Agitator_Status9" }, { name: "310A-AG-10", tagName: "310A_AC_09_12_OUT_Agitator_Status10" },
                                { name: "310A-AG-11", tagName: "310A_AC_09_12_OUT_Agitator_Status11" }, { name: "310A-AG-12", tagName: "310A_AC_09_12_OUT_Agitator_Status12" },
                            ]}/>

                            </VStack>
                        </GridItem>

                        <GridItem>
                            <VStack h="100%" spacing={4} align="stretch">
                                <Widget_SingleValue 
                                widgetName="Attrition & Flotation Area Specific Energy Consumption, kWt/t" 
                                apiType="API_Actual" 
                                items={[{ label: "Energy Consumption", 
                                    tagName: "Attrition_and_Flotation_Area_OUT_SpecificEnergyConsumption", 
                                    unit: "kWt/t" }]} 
                                />
                                
                                <Widget_SingleValue widgetName="310A-CY-01 Attrition Dewatering Cyclone" apiType="API_Actual" items={[
                                    { label: "Operating Pressure, kPa", tagName: "310A_CY_01_ID_In_P", unit: "kPa" },
                                    { label: "Dry Feed Mass Rate", tagName: "310A_CY_01_OUT_Out_Dry_W", unit: "t/h" },
                                    { label: "Feed Density", tagName: "310A_CY_01_ID_In_SolidConcentration", unit: "t/m3" },
                                    { label: "Underflow %", tagName: "Attrition_and_Flotation_Area_ID_Out_M_AD_Underflow_SolidPercentage", unit: "%" },
                                    { label: "Overflow Size 40 um, %", tagName: "310A_CY_01_ID_OutLight_Size2", unit: "%" },
                                ]} />
                                <HeatMapChart widgetName="Sump 310A Drive Status" ColumnNumbers={2} tiles={[
                                    { name: "310A-VP-01D", tagName: "310A_TK_01_OUT_Sumpf_Pump1_Status" },
                                    { name: "310A-VP-01S", tagName: "310A_TK_01_OUT_Sumpf_Pump2_Status" },
                                ]}/>

                            </VStack>
                        </GridItem>

                        <GridItem>
                            <VStack h="100%" spacing={4} align="stretch">
                            <Widget_SingleValue widgetName="310A-CY-02 Secondary Deslime Cyclone" apiType="API_Actual" items={[
                                { label: "Operating Pressure, kPa", tagName: "310A_CY_02_ID_In_P", unit: "kPa" },
                                { label: "Dry Feed Mass Rate", tagName: "310A_CY_02_OUT_Out_Dry_W", unit: "t/h" },
                                { label: "Feed Density,solids", tagName: "310A_CY_02_ID_In_SolidConcentration", unit: "Kg/m3" },
                                { label: "Secondary Deslime cyclon Percentage of 40um in overflow", tagName: "Attrition_and_Flotation_Area_ID_Out_M_SD_Overflow_PSD40Percentage", unit: "%" },
                            ]} />
                            <HeatMapChart widgetName="310A-PB-02 Pump Box Drive Status" ColumnNumbers={2} tiles={[
                                { name: "310A-SP-02D", tagName: "310A_PB_02_OUT_PumpD_Status" },
                                { name: "310A-SP-02S", tagName: "310A_PB_02_OUT_PumpS_Status" },
                            ]}/>
                            <HeatMapChart widgetName="310A-PB-03 Pump Box Drive Status" ColumnNumbers={2} tiles={[
                                { name: "310A-SP-03D", tagName: "310A_PB_03_OUT_PumpD_Status" },
                                { name: "310A-SP-03S", tagName: "310A_PB_03_OUT_PumpS_Status" },
                            ]}/>

                            </VStack>
                        </GridItem>

                        <GridItem>
                            <VStack h="100%" spacing={4} align="stretch">
                            <Widget_SingleValue widgetName="310A-CY-03 Tertiary Deslime Cyclone" apiType="API_Actual" items={[
                                { label: "Operating Pressure, kPa", tagName: "310A_CY_03_ID_In_P", unit: "kPa" },
                                { label: "Dry Feed Mass Rate", tagName: "310A_CY_03_OUT_Out_Dry_W", unit: "t/h" },
                                { label: "Feed Density,solids", tagName: "310A_CY_03_ID_In_SolidConcentration", unit: "t/m3" },
                                { label: "Tertiary Deslime cyclon Percentage of 40mu in overflow ", tagName: "Attrition_and_Flotation_Area_ID_Out_M_TD_Overflow_PSD40Percentage", unit: "%" },
                            ]} />
                            <HeatMapChart widgetName="310A-PB-04 Pump Box Drive Status" ColumnNumbers={2} tiles={[
                                { name: "310A-SP-04D", tagName: "310A_PB_04_OUT_PumpD_Status" },
                                { name: "310A-SP-04S", tagName: "310A_PB_04_OUT_PumpS_Status" },
                            ]}/>
                            <HeatMapChart widgetName="310-A-TK-01 Attrition Feed Tank Drive Status" ColumnNumbers={2} tiles={[
                                { name: "310A-SP-01D", tagName: "310A_TK_01_OUT_PumpD_Status" },
                                { name: "310A-SP-01S", tagName: "310A_TK_01_OUT_PumpS_Status" },
                            ]}/>

                            </VStack>
                        </GridItem>
                    


                    </Grid>
                </Box>
                

                <Box> 
                    <Grid
                            templateColumns="repeat(4, 1fr)" // Creates 4 equal-width columns
                            gap={6}
                        >
                        <GridItem>
                            <TrendSeries_MultiTag widgetName="Level 231-A-TK-01 Hydrosizer Feed Tank" tagNames={["310A_TK_01_ID_LVLA"]} trendNames={["Level A, %"]} timePeriodInHours={24} />
                        </GridItem>
                        <GridItem>
                            <TrendSeries_MultiTag widgetName="Level 310-A-PB-02 Pump Box" tagNames={["310A_PB_02_ID_LVLA"]} trendNames={["Level A, %"]} timePeriodInHours={24} />
                        </GridItem>
                        <GridItem>
                            <TrendSeries_MultiTag widgetName="Level 310-A-PB-03 Pump Box" tagNames={["310A_PB_03_ID_LVLA"]} trendNames={["Level A, %"]} timePeriodInHours={24} />
                        </GridItem>
                        <GridItem>
                            <TrendSeries_MultiTag widgetName="Level 310-A-PB-04 Pump Box" tagNames={["310A_PB_04_ID_LVLA"]} trendNames={["Level A, %"]} timePeriodInHours={24} />
                        </GridItem> 



                        </Grid>
                </Box>

            </VStack> 

         
            
 
         

        </Box>

        
    );
};

export default AttritionAreaPage;
