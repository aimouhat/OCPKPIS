import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag";
import HeatMapChart from "../components/widgets/HeatMapChart";
import Widget_SingleValue from "../components/widgets/Widget_SingleValue";
import TableWithTimeStamp from "../components/widgets/TableWithTimeStamp"; // Import the new widget
import BarChart from "../components/widgets/BarChart";

const FlotationAreaPage = () => {
    return (
        <Box p={6}> 
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>320-Flotation</Heading>
            </Box>

            <VStack spacing={6} align="stretch" p={6}>  
                {/* --- UPPER PART (4 Columns) --- */} 
                <Box> 
                    <Grid
                        templateColumns="repeat(3, 1fr)" // Creates 4 equal-width columns
                        gap={6}
                    > 
                        <GridItem>
                            <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>

                                <Heading size="md" mb={4} textAlign="center" >320A-TK-01,05 Flotation Conditioner Tanks</Heading>
                                <Grid
                                    templateColumns="repeat(2, 1fr)" // Creates 4 equal-width columns
                                    gap={6}
                                >   
                                <GridItem>
                                    <Widget_SingleValue widgetName="320A-TK-01,05 KPI" apiType="API_Actual" items={[
                                        { label: "Cell Dry Feed Mass Rate", tagName: "320A_TK_01_05_OUT_In_Dry_W", unit: "t/h" },
                                        { label: "Slurry Solids Concentration (Solids)", tagName: "320A_TK_01_05_ID_In_SolidConcentration", unit: "t/m3" },
                                        { label: "Slurry Residence Time", tagName: "320A_TK_01_05_OUT_Residence_Time", unit: "min" },
                                        { label: "Agitator Power Consumption", tagName: "320A_TK_01_05_OUT_PowerConsumption", unit: "kWt/t" },
                                    ]} />
                                </GridItem>

                                <GridItem>
                                    <HeatMapChart widgetName="320A-TK-01,05 Statuses" ColumnNumbers={1} tiles={[
                                        { name: "320A-AG-01 Agitator Status", tagName: "320A_TK_01_05_OUT_Agitator_Status1" },
                                        { name: "320A-AG-02 Agitator Status", tagName: "320A_TK_01_05_OUT_Agitator_Status2" },
                                        { name: "320A-AG-03 Agitator Status", tagName: "320A_TK_01_05_OUT_Agitator_Status3" },
                                        { name: "320A-AG-04 Agitator Status", tagName: "320A_TK_01_05_OUT_Agitator_Status4" },
                                        { name: "320A-AG-05 Agitator Status", tagName: "320A_TK_01_05_OUT_Agitator_Status5" },
                                    ]} />
                                </GridItem>

                                </Grid>
                            </Box> 
                        </GridItem>


                        <GridItem>
                            <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>
                                <Heading size="md" mb={4} textAlign="center" >320A-FC-01,05 Flotation Cells</Heading>
                                <Grid
                                    templateColumns="repeat(2, 1fr)" // Creates 4 equal-width columns
                                    gap={6}
                                >
                                     <GridItem>
                                        <Widget_SingleValue widgetName="320A-FC-01,05 KPI" apiType="API_Actual" items={[
                                            { label: "Cell Dry Feed Mass Rate", tagName: "320A_FC_01_05_OUT_In_Dry_W", unit: "t/h" },
                                            { label: "Feed Density (solids)", tagName: "320A_FC_01_05_ID_In_SolidConcentration", unit: "t/m3" },
                                            { label: "Slurry Residence Time", tagName: "320A_FC_01_05_OUT_Residence_Time", unit: "min" },
                                            { label: "Air Consumption", tagName: "320A_FC_01_05_ID_AirConsumption", unit: "m3/h" },
                                            { label: "Operating Pressure1", tagName: "320A_FC_01_05_ID_In_P1", unit: "bar" },
											{ label: "Operating Pressure2", tagName: "320A_FC_01_05_ID_In_P2", unit: "bar" },
											{ label: "Operating Pressure3", tagName: "320A_FC_01_05_ID_In_P3", unit: "bar" },
											{ label: "Operating Pressure4", tagName: "320A_FC_01_05_ID_In_P4", unit: "bar" },
                                            { label: "BPL Recovery", tagName: "Attrition_and_Flotation_Area_ID_BPL_Recovery", unit: "%" }, 
                                        ]} />
                                     </GridItem>

                                      <GridItem>
                                        <HeatMapChart widgetName="320A-FC-01,05 Statuses" ColumnNumbers={1} tiles={[
                                            { name: "320A-AG-06", tagName: "320A_FC_01_05_OUT_Agitator_Status1" },
                                            { name: "320A-AG-07", tagName: "320A_FC_01_05_OUT_Agitator_Status2" },
                                            { name: "320A-AG-08", tagName: "320A_FC_01_05_OUT_Agitator_Status3" },
                                            { name: "320A-AG-09", tagName: "320A_FC_01_05_OUT_Agitator_Status4" },
                                            { name: "320A-AG-10", tagName: "320A_FC_01_05_OUT_Agitator_Status5" },
                                        ]} />
                                      </GridItem>

                                </Grid>

                            </Box> 
                        </GridItem>
                        

                        <GridItem>
                            <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>
                                <Heading size="md" mb={4} textAlign="center" >Flotation Product Dewatering</Heading>
                                <Grid
                                    templateColumns="repeat(2, 1fr)" // Creates 4 equal-width columns
                                    gap={6}
                                >
                                    <GridItem>
                                        <Widget_SingleValue widgetName="320A-CY-01 Flotation Product Dewatering Cyclone Cluster" apiType="API_Actual" items={[
                                            { label: "Operating Pressure", tagName: "320A_CY_01_ID_In_P_bar", unit: "bar" },
                                            { label: "Feed Density (solids)", tagName: "320A_CY_01_ID_In_SolidConcentration", unit: "t/m3" },
                                            { label: "Underflow, %", tagName: "Attrition_and_Flotation_Area_ID_Out_M_FPD_Underflow_SolidPercentage", unit: "%" },
                                            { label: "Dry Feed Mass Rate", tagName: "320A_CY_01_OUT_Out_Dry_W", unit: "t/h" },
                                            { label: "Feed Solids to Overflow", tagName: "Attrition_and_Flotation_Area_ID_Out_M_FPD_Overflow_SolidPercentage", unit: "%" },
                                        ]} /> 
                                    </GridItem>

                                    <GridItem>
                                        <VStack h="100%" spacing={4} align="stretch">   
                                            <HeatMapChart widgetName="320A-PB-01 Flotation Product Dewatering Pump Box" ColumnNumbers={2} tiles={[
                                                { name: "320A-SP-01D", tagName: "320A_PB_01_OUT_PumpD_Status" },
                                                { name: "320A-SP-01S", tagName: "320A_PB_01_OUT_PumpS_Status" },
                                            ]} />

                                            <HeatMapChart widgetName="320A-PB-02 Flotation Rejects Pump Box" ColumnNumbers={2} tiles={[
                                                { name: "320A-SP-02D", tagName: "320A_PB_02_OUT_PumpD_Status" },
                                                { name: "320A-SP-02S", tagName: "320A_PB_02_OUT_PumpS_Status" },
                                            ]} />
                                        </VStack>
                                    </GridItem>


                                </Grid>


                            </Box> 
                        </GridItem>




                    </Grid>

                    
                </Box> 

                {/* --- BOTTOM PART (3 Columns) --- */} 
                <Box> 
                    <Grid
                        templateColumns="repeat(4, 1fr)" // Creates 4 equal-width columns
                        gap={6}
                    > 
                        <GridItem>
                            <VStack h="100%" spacing={4} align="stretch">  
                            <TrendSeries_MultiTag widgetName="320A-A-PB-01 Flotation Product Dewatering Pump Box Level A, %" 
                            tagNames={["320A_PB_01_ID_LVLA"]} 
                            trendNames={["Level A"]} 
                            timePeriodInHours={720} />

                            <TrendSeries_MultiTag widgetName="Level 320A-FC-01 Flotation Cell, %" 
                            tagNames={["320A_FC_01_05_ID_LVL1"]} 
                            trendNames={["Cell Level"]} 
                            timePeriodInHours={720} />
                            </VStack>
                        </GridItem>

                        <GridItem>
                            <VStack h="100%" spacing={4} align="stretch">  
                            <Widget_SingleValue widgetName="Flotation Aid Consumption Range" apiType="API_Actual" items={[
                                { label: "Phosphoric Acid Specific Consumption", tagName: "PlantA_OUT_SpecificPhoAcidConsumption_OnlineTOTAL", unit: "g/t" },
                                { label: "Phosphoric Ester Specific Consumption", tagName: "PlantA_OUT_SpecificPhoEsterConsumption_OnlineTOTAL", unit: "g/t" },
                                { label: "Amine Specific Consumption", tagName: "PlantA_OUT_SpecificAmineConsumption_OnlineTOTAL", unit: "g/t" },
                            ]} />


                            <TrendSeries_MultiTag widgetName="Level 320A-FC-03 Flotation Cell, %" 
                            tagNames={["320A_FC_01_05_ID_LVL3"]} 
                            trendNames={["Cell Level"]} 
                            timePeriodInHours={720} />
                            </VStack>
                        </GridItem>

                        <GridItem>
                            <VStack h="100%" spacing={4} align="stretch">  
                                <TrendSeries_MultiTag widgetName="320A-PB-02 Flotation Rejects Pump Box Level A, %" 
                                tagNames={["320A_PB_02_ID_LVLA"]} 
                                trendNames={["Level A"]} 
                                timePeriodInHours={720} />

                                <TrendSeries_MultiTag widgetName="Level 320A-FC-05 Flotation Cell, %" 
                                tagNames={["320A_FC_01_05_ID_LVL5"]} 
                                trendNames={["Cell Level"]} 
                                timePeriodInHours={720} />
                            </VStack>
                        </GridItem>

                        
                        <GridItem>
                            <VStack h="100%" spacing={4} align="stretch">   
                                    <TableWithTimeStamp
                                        widgetName="Flotation Input Quality Laboratory Analysis"
                                        items={[
                                            { label: "BPL", tagName: "Attrition_and_Flotation_Area_ID_In_M_FlotInput_BPL", unit: "%" },  
                                            { label: "CO2", tagName: "Attrition_and_Flotation_Area_ID_In_M_FlotInput_CO2", unit: "%" },
                                            { label: "SiO2", tagName: "Attrition_and_Flotation_Area_ID_In_M_FlotInput_SiO2", unit: "%" },
                                            { label: "MgO", tagName: "Attrition_and_Flotation_Area_ID_In_M_FlotInput_MgO", unit: "%" },
                                            { label: "Cd", tagName: "Attrition_and_Flotation_Area_ID_In_M_FlotInput_Cd", unit: "ppm" },
                                            { label: "CaO", tagName: "Attrition_and_Flotation_Area_ID_In_M_FlotInput_CaO", unit: "%" },
                                        
                                        ]}
                                    />  
 
                                    <BarChart
                                        widgetName="Flotation Input PSD Laboratory Analysis [%]"
                                        apiType="API_Actual"
                                    
                                            items={[
                                                { label: "Less 40um", tagName: "Attrition_and_Flotation_Area_ID_In_M_FlotInput_Less40" },// 320A_FC_01_05_ID_In_P4      120G_RC_01_ID_BucketWheel_UHH_T
                                                { label: "40um", tagName: "Attrition_and_Flotation_Area_ID_In_M_FlotInput_40" },
                                                { label: "160um", tagName: "Attrition_and_Flotation_Area_ID_In_M_FlotInput_160" },
                                                { label: "200um", tagName: "Attrition_and_Flotation_Area_ID_In_M_FlotInput_200" },
                                                { label: "3150um", tagName: "Attrition_and_Flotation_Area_ID_In_M_FlotInput_3150" },
                                            ]}
                                        /> 
                            </VStack>
                        </GridItem>


                    </Grid>
                </Box> 
 
            </VStack>
        </Box>
    );
};

export default FlotationAreaPage;
