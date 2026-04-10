import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag";
import HeatMapChart from "../components/widgets/HeatMapChart";
import Widget_SingleValue from "../components/widgets/Widget_SingleValue";
import TableWithTimeStamp from "../components/widgets/TableWithTimeStamp"; // Import the new widget
import BarChart from "../components/widgets/BarChart";

const ScrubbingAndScreeningPage = () => {
    return (
        <Box p={6}>
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>210-Scrubbing and Screening Dashboard</Heading>
            </Box>

            <VStack spacing={6} align="stretch" p={6}>   
                {/* --- UPPER PART (3 Columns) --- */} 
                <Box>
                    <Grid
                        templateColumns="repeat(5, 1fr)" // Creates 3 equal-width columns
                        gap={6}
                    > 
                        <GridItem colSpan={{ base: 5, xl: 1 }}>
                            <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>
                                <Heading size="md" mb={4} textAlign="center" >Sump</Heading>  
                                    <VStack h="100%" spacing={4} align="stretch">
                                        <HeatMapChart widgetName="210A Sumpf Status" ColumnNumbers={1} tiles={[{ name: "210A-VP-01 Pump", tagName: "210A_VP_01_OUT_Sumpf_Pump1_Status" }]} />
                                        <HeatMapChart widgetName="220A Sumpf Status" ColumnNumbers={1} tiles={[{ name: "220A-PB-01 Pump", tagName: "220A_PB_01_OUT_Sumpf_Pump1_Status" }]} /> 
                                        <HeatMapChart widgetName="230A Sumpf Status" ColumnNumbers={1} tiles={[{ name: "230A-PB-01 Pump", tagName: "220A_PB_01_OUT_Sumpf_Pump2_Status" }]} />
                                        
                                    </VStack> 
                                <HeatMapChart widgetName="230A Tank Drive Motor Status"  
                                    ColumnNumbers = {2}
                                    tiles={[
                                            { name: "230A-TK-03 PUMP D", tagName: "230A_TK_03_OUT_PumpD_Status" },  
                                            { name: "230A-TK-03 PUMP S", tagName: "230A_TK_03_OUT_PumpS_Status" },  
                                         ]} />
                            </Box> 
                        </GridItem>  

                        <GridItem colSpan={{ base: 5, xl: 2 }}>
                            <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>
                                <Heading size="md" mb={4} textAlign="center" >210A-SB-01 Scrubber KPI</Heading> 
                                    <VStack h="100%" spacing={4} align="stretch">
                                        <Grid
                                            templateColumns="repeat(2, 1fr)" // Creates 3 equal-width columns
                                            gap={6}
                                        >
                                        <GridItem colSpan={{ base: 3, xl: 1 }}>
                                            <VStack h="100%" spacing={4} align="stretch">
                                                <Widget_SingleValue widgetName="210-SB-01 Scubber KPI" apiType="API_Actual" items={[
                                                    { label: "Specific Energy Consumption", tagName: "210A_SB_01_OD_SpecificEnergyConsumption", unit: "kWt/t" },
                                                    { label: "Wash Efficiency", tagName: "PlantA_OUT_ScrubbingScreeningMassYield", unit: "%"  },
                                                    { label: "Bearing Temperature", tagName: "210A_SB_01_ID_Driver1_Bearing1_T", unit: "C" }, 
                                                ]} /> 
                                                
                                            <Widget_SingleValue widgetName="210-SB-01 Scubber KPI" apiType="API_Actual" items={[ 
                                                { label: "Discharge (% Solids Volume Basis)", tagName: "210A_SB_01_ID_Out_SolidConcentration", unit: "%" },
                                                { label: "Dry Feed Mass Rate", tagName: "210A_SB_01_OUT_Out_Dry_W", unit: "t/h" }, 
                                            ]} />  
                                            <Widget_SingleValue widgetName="210-SB-01 Scubber KPI" apiType="API_Actual" items={[  
                                                { label: "Motor Windings Temperature", tagName: "210A_SB_01_ID_Driver1_Windings1_T", unit: "C" },
                                                { label: "Scrubber Online Time", tagName: "210A_SB_01_OUT_Online_Time", unit: "h" },
                                            ]} /> 
                                            </VStack> 

                                        </GridItem>
                                        
                                        <GridItem colSpan={{ base: 3, xl: 1 }}>
                                            <HeatMapChart widgetName="Scrubber Drive Motor Status" 
                                    
                                            ColumnNumbers = {1}
                                            tiles={[
                                                { name: "Scrubber Motor 1", tagName: "210A_SB_01_OUT_Driver1_Status" },  
                                                { name: "Scrubber Motor 2", tagName: "210A_SB_01_OUT_Driver2_Status" }, 
                                                { name: "Scrubber Motor 3", tagName: "210A_SB_01_OUT_Driver3_Status" },
                                                { name: "Scrubber Motor 4", tagName: "210A_SB_01_OUT_Driver4_Status1" },
                                                { name: "Scrubber Motor 5", tagName: "210A_SB_01_OUT_Driver5_Status" }, 
                                            ]} />
                                        </GridItem>
 

                                       
                                  



                                        </Grid>

                                        

                                    </VStack> 
                            </Box> 
                                    <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>
                                        <GridItem>
                                                                           
                                        </GridItem>
                                   
                                    </Box> 
                        </GridItem> 

                        <GridItem> 
                            <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>
                                <Heading size="md" mb={4} textAlign="center" >Scrubber Discahrge Screen KPI</Heading> 
                                
                                <VStack h="100%" spacing={4} align="stretch">
                                    <Widget_SingleValue widgetName="210-SC-01 Scubber Discharge Screen KPI" apiType="API_Actual" items={[
                                        { label: "Percent -3.15 mm in oversize", tagName: "210A_SC_01_ID_Out2_M_Size", unit: "%" }, 
                                        { label: "Screen Product Throughout Rate", tagName: "210A_SC_01_OUT_Out1_W", unit: "t/h" },
                                    ]} /> 
                                    
                                    <HeatMapChart widgetName="Scrubber Screen Drive status" ColumnNumbers={1} tiles={[{ name: "Scrubber Screen Drive", tagName: "210A_SC_01_OUT_Driver_Status" }]} />
                                  
                                 
                                </VStack> 
                            </Box>  
                        </GridItem> 

                        <GridItem colSpan={{ base: 5, xl: 1 }}>
                            <VStack h="100%" spacing={4} align="stretch">
                                <TableWithTimeStamp
                                    widgetName="Raw Ore Quality Laboratory Analysis"
                                    items={[
                                        { label: "BPL", tagName: "PlantA_ID_RawOre_M_Conce_BPL", unit: "%" },
                                        { label: "CO2", tagName: "PlantA_ID_RawOre_M_Conce_CO2" , unit: "%"},
                                        { label: "SiO2", tagName: "PlantA_ID_RawOre_M_Conce_SiO2", unit: "%" },
                                        { label: "MgO", tagName: "PlantA_ID_RawOre_M_Conce_MgO", unit: "%" },
                                        { label: "Cd", tagName: "PlantA_ID_RawOre_M_Conce_Cd", unit: "ppm" },
                                        { label: "CaO", tagName: "PlantA_ID_RawOre_M_Conce_CaO", unit: "%" },
                                        { label: "H2O", tagName: "PlantA_ID_RawOre_M_Conce_H2O", unit: "%" },
                                    ]}
                                />
                                <BarChart
                                    widgetName="Raw Ore PSD Laboratory Analysis [%]"
                                    apiType="API_Actual"
                                
                                        items={[
                                            { label: "Less 40 µm", tagName: "PlantA_ID_M_RawOre_PSD_Less40" },
                                            { label: "40 µm", tagName: "PlantA_ID_M_RawOre_PSD_40" },
                                            { label: "160 µm", tagName: "PlantA_ID_M_RawOre_PSD_160" },
                                            { label: "200 µm", tagName: "PlantA_ID_M_RawOre_PSD_200" },
                                            { label: "3150 µm", tagName: "PlantA_ID_M_RawOre_PSD_3150" },
                                        ]}
                                    />
                            </VStack>

                        </GridItem>
                        


                    </Grid> 

                </Box>

                <Box>
                    <Grid templateColumns="repeat(5, 1fr)" gap={6}> 
                                        <GridItem>
                                            <VStack h="100%" spacing={4} align="stretch">
                                                <TrendSeries_MultiTag widgetName="210A-HP-01 Ore Hopper Levels , %" tagNames={["210A_HP_01_ID_LVLA", "210A_HP_01_ID_LVLB"]} trendNames={["Bin Level A, %", "Bin Level B, %"]} 
                                                timePeriodInHours={24} />
                                                
                                            </VStack>
                
                                        </GridItem>
                                        

                                        <GridItem>
                                            <VStack h="100%" spacing={4} align="stretch">
                                                <TrendSeries_MultiTag widgetName="210A Sumpf Level, %" tagNames={[  "210A_VP_01_ID_Sumpf_LVL1"]} trendNames={["Level A, %"]} timePeriodInHours={24} />
                                                
                                            </VStack>
                
                                        </GridItem>

                                        <GridItem>
                                            <VStack h="100%" spacing={4} align="stretch">
                                                <TrendSeries_MultiTag widgetName="220A Sumpf level A, %" tagNames={["220A_PB_01_ID_Sumpf_LVL1"]} trendNames={["Level A"]} timePeriodInHours={24} />
                                                

                                            </VStack>

                                        </GridItem>

                                        <GridItem>
                                            <VStack h="100%" spacing={4} align="stretch"> 
                                                <TrendSeries_MultiTag widgetName="230A Sumpf level A, %" tagNames={["220A_PB_01_ID_Sumpf_LVL2"]} trendNames={["Level A"]} timePeriodInHours={24} />
                                            

                                            </VStack>

                                        </GridItem>

                                        <GridItem>
                                            <VStack h="100%" spacing={4} align="stretch"> 
                                                <TrendSeries_MultiTag widgetName="230A Tank Level A, %" tagNames={["230A_TK_03_ID_LVLA"]} trendNames={["Level A"]} timePeriodInHours={24} />
                                            

                                            </VStack>

                                        </GridItem>

                                        <GridItem colSpan={{ base: 12, md: 1 }}>
                                        </GridItem>

                                        <GridItem>

                                        
                                        </GridItem>



                    </Grid>

                </Box>

            </VStack>

        </Box>



    );
};

export default ScrubbingAndScreeningPage;
