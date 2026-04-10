import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag";
import HeatMapChart from "../components/widgets/HeatMapChart";
import Widget_SingleValue from "../components/widgets/Widget_SingleValue";

const FlotationReagentPage = () => {
    return (
        <VStack spacing={6} align="stretch" p={6}>
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>330-Flotation Reagent Preparation</Heading>
            </Box>

            <VStack spacing={6} align="stretch" p={6}>

                <Grid templateColumns="repeat(12, 1fr)" gap={6}>
    
                    <GridItem colSpan={{ base: 12, md: 3, xl: 2 }}>
                        <HeatMapChart widgetName="340G-TK-10 Heating Tank Drives" ColumnNumbers={1} tiles={[
                            { name: "340G-WP-01D Pump", tagName: "340G_TK_10_OUT_PumpD_Status" },
                            { name: "340G-WP-01S Pump", tagName: "340G_TK_10_OUT_PumpS_Status" },
                            { name: "340G-WP-02 Pump", tagName: "340G_TK_10_OUT_Pump1_Status" },
                        ]}/>
                    </GridItem>  
                
                    <GridItem colSpan={{ base: 12, md: 6, xl: 6 }}>
                        <TrendSeries_MultiTag widgetName="Level 340G-TK-10 Heating Tank" tagNames={["340G_TK_10_ID_LVLA"]} trendNames={["Level A, %"]} timePeriodInHours={24} />
                    </GridItem>
                    
                    <GridItem colSpan={{ base: 12, md: 6, xl: 3 }}>
                        <Widget_SingleValue widgetName="Flotation Reagent Dosing" apiType="API_Actual" items={[
                            { label: "Amine Dosing Flowmeter", tagName: "Flotation_Reagent_Preparation_Area_ID_Out_Amine_Q", unit: "l/h" },
                            { label: "Phosphate Ester Flowmeter", tagName: "Flotation_Reagent_Preparation_Area_ID_Out_PhoEster_Q", unit: "l/h" },
                            { label: "Phosphate Acid Flowmeter", tagName: "Flotation_Reagent_Preparation_Area_ID_Out_PhoAcid_Q", unit: "l/h" }, 
                        ]} />
                    </GridItem>


                </Grid>


                
                <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>
                    <Heading size="md" mb={4} textAlign="center" >Amine Reagent Preparation</Heading>

                    <Grid
                        templateColumns="repeat(9, 1fr)" // Creates 4 equal-width columns
                        gap={7}
                    > 
                        
                        <GridItem colSpan={{ base: 12, xl: 3 }}>
                            <VStack h="100%" spacing={4} align="stretch">
                                <HeatMapChart widgetName="330G-TK-08 Amine Storage Tank Drive Status" 
                                ColumnNumbers = {3}
                                tiles={[
                                    { name: "330G-AP-11 Pump", tagName: "330G_TK_08_OUT_Pump1_Status" },
                                    { name: "330G-AP-01D Pump", tagName: "330G_TK_08_OUT_PumpD_Status" },
                                    { name: "330G-AP-01S Pump", tagName: "330G_TK_08_OUT_PumpS_Status" },
                                ]}/>
                                
                                <TrendSeries_MultiTag widgetName="330G-TK-08 Amine Storage Tank" tagNames={["330G_TK_08_ID_LVLA"]} trendNames={["Level A, %"]} timePeriodInHours={24} />

                            </VStack>

                        </GridItem>
                        
                        <GridItem colSpan={{ base: 12, xl: 3 }}>
                            <VStack h="100%" spacing={4} align="stretch">
                                <HeatMapChart widgetName="330G-TK-01 Amine Preparation Tank Drive Status" 
                                ColumnNumbers = {4}
                                tiles={[
                                    { name: "330G-AG-01 Agitator", tagName: "330G_TK_01_OUT_Agitator_Status" },
                                    { name: "330G-AP-02D Pump", tagName: "330G_TK_01_OUT_PumpD_Status" },
                                    { name: "330G-AP-02S Pump", tagName: "330G_TK_01_OUT_PumpS_Status" },
                                    { name: "330G-VP-04 Sumpf Pump", tagName: "330G_TK_01_OUT_Sumpf_Pump1_Status" },
                                ]}/>

                                <TrendSeries_MultiTag widgetName="330G-TK-01 Amine Preparation Tank" tagNames={["330G_TK_01_ID_LVLA", "330G_TK_01_ID_LVLB"]} trendNames={["Level A, %", "Level B, %"]} timePeriodInHours={24} />
                            </VStack> 
                        </GridItem> 
                        
                        <GridItem colSpan={{ base: 12, xl: 3 }}>
                            <VStack h="100%" spacing={4} align="stretch">
                                <HeatMapChart widgetName="330G-TK-02 Amine Dosing Tank Drive Status" 
                                ColumnNumbers = {4}
                                tiles={[
                                    { name: "330G-AP-03D Pump", tagName: "330G_TK_02_OUT_PumpD_Status" },
                                    { name: "330G-AP-03S Pump", tagName: "330G_TK_02_OUT_PumpS_Status" },
                                    { name: "330G-AG-02 Agitator", tagName: "330G_TK_02_OUT_Agitator_Status" },
                                    { name: "330G-VP-01 Sumpf Pump", tagName: "330G_TK_02_OUT_Sumpf_Pump1_Status" },
                                ]}/>

                                <TrendSeries_MultiTag widgetName="330G-TK-02 Amine Dosing Tank" tagNames={["330G_TK_02_ID_LVLA"]} trendNames={["Level A, %"]} timePeriodInHours={24} />
                            </VStack>
                            


                        </GridItem>

         
                        

                    </Grid>

                </Box>  



                <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>
                    <Heading size="md" mb={4} textAlign="center" >Phosphoric Ester Reagent Preparation</Heading>
                    <Grid
                        templateColumns="repeat(9, 1fr)" // Creates 4 equal-width columns
                        gap={7}
                    > 
                        <GridItem colSpan={{ base: 12, xl: 3 }}>
                            <VStack h="100%" spacing={4} align="stretch">
                                <HeatMapChart widgetName="330G-TK-09 Phosphoric Ester Storage Tank Drive Status" 
                                ColumnNumbers = {3}
                                tiles={[
                                    { name: "330G-EP-04D Pump", tagName: "330G_TK_09_OUT_PumpD_Status" },
                                    { name: "330G-EP-04S Pump", tagName: "330G_TK_09_OUT_PumpS_Status" },
                                    { name: "330G-EP-12 Pump", tagName: "330G_TK_09_OUT_Pump1_Status" },
                                ]}/>
                                <TrendSeries_MultiTag widgetName="330G-TK-09 Phosphoric Ester Storage Tank" tagNames={["330G_TK_09_ID_LVLA"]} trendNames={["Level A, %"]} timePeriodInHours={24} />

                            </VStack>

                        </GridItem>
                        
                        <GridItem colSpan={{ base: 12, xl: 3 }}>
                            <VStack h="100%" spacing={4} align="stretch">
                                <HeatMapChart widgetName="330G-TK-03 Phosphoric Ester Preparation Tank Drive Status" 
                                ColumnNumbers = {4}
                                tiles={[
                                    { name: "330G-AG-03 Agitator", tagName: "330G_TK_03_OUT_Agitator_Status" },
                                    { name: "330G-EP-05D Pump", tagName: "330G_TK_03_OUT_PumpD_Status" },
                                    { name: "330G-EP-05S Pump", tagName: "330G_TK_03_OUT_PumpS_Status" },
                                    { name: "330G-VP-05 Sumpf Pump", tagName: "330G_TK_03_OUT_Sumpf_Pump1_Status" },
                                ]}/>
                            <TrendSeries_MultiTag widgetName="330G-TK-03 Phosphoric Ester Preparation Tank" tagNames={["330G_TK_03_ID_LVLA"]} trendNames={["Level A, %"]} timePeriodInHours={24} />  
                            </VStack>
                        </GridItem>
                        

                       <GridItem colSpan={{ base: 12, xl: 3 }}>
                            <VStack h="100%" spacing={4} align="stretch">
                                <HeatMapChart widgetName="330G-TK-04 Phosphoric Ester Dosing Tank Drive Status" 
                                ColumnNumbers = {4}
                                tiles={[
                                    { name: "330G-RP-06D Pump", tagName: "330G_TK_04_OUT_PumpD_Status" },
                                    { name: "330G-RP-06S Pump", tagName: "330G_TK_04_OUT_PumpS_Status" },
                                    { name: "330G-AG-04 Agitator", tagName: "330G_TK_04_OUT_Agitator_Status" },
                                    { name: "330G-VP-02 Sumpf Pump", tagName: "330G_TK_04_OUT_Sumpf_Pump1_Status" },
                                ]}/>
                                <TrendSeries_MultiTag widgetName="330G-TK-04 Phosphoric Ester Dosing Tank" tagNames={["330G_TK_04_ID_LVLA"]} trendNames={["Level A, %"]} timePeriodInHours={24} />  
                            </VStack>
                        </GridItem>
                        


                       


                    </Grid>

                </Box> 


                <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>
                    <Heading size="md" mb={4} textAlign="center" >Phosphoric Acid Reagent Preparation</Heading>

                    <Grid
                        templateColumns="repeat(9, 1fr)" // Creates 4 equal-width columns
                        gap={7}
                    >
                        
                        <GridItem colSpan={{ base: 12, xl: 3 }}>
                            <VStack h="100%" spacing={4} align="stretch">
                                <HeatMapChart widgetName="330G-TK-07 Phosphoric Acid Storage Tank Drive Status" 
                                ColumnNumbers = {3}
                                tiles={[
                                    { name: "330G-PP-08D Pump", tagName: "330G_TK_07_OUT_PumpD_Status" },
                                    { name: "330G-PP-08S Pump", tagName: "330G_TK_07_OUT_PumpS_Status" },
                                    { name: "330G-PP-07 Pump", tagName: "330G_TK_07_OUT_Pump1_Status" },
                                ]}/>
                                <TrendSeries_MultiTag widgetName="330G-TK-07 Phosphoric Acid Storage Tank" tagNames={["330G_TK_07_ID_LVLA"]} trendNames={["Level A, %"]} timePeriodInHours={24} /> 

                            </VStack> 
                            

                        </GridItem>

                       <GridItem colSpan={{ base: 12, xl: 3 }}>
                            <VStack h="100%" spacing={4} align="stretch">
                                <HeatMapChart widgetName="330G-TK-05 Phosphoric Acid Preparation Tank Drive Status" 
                                ColumnNumbers = {3}
                                tiles={[
                                    { name: "330G-AG-05 Agitator", tagName: "330G_TK_05_OUT_Agitator_Status" },
                                    { name: "330G-EP-09D Pump", tagName: "330G_TK_05_OUT_PumpD_Status" },
                                    { name: "330G-EP-09S Pump", tagName: "330G_TK_05_OUT_PumpS_Status" },
                                    { name: "330G-VP-06 Sumpf Pump", tagName: "330G_TK_05_OUT_Sumpf_Pump1_Status" },
                                ]}/>
                                <TrendSeries_MultiTag widgetName="330G-TK-05 Phosphoric Acid Preparation Tank" tagNames={["330G_TK_05_ID_LVLA"]} trendNames={["Level A, %"]} timePeriodInHours={24} />

                            </VStack> 

                        </GridItem>
                        
                        
                        <GridItem colSpan={{ base: 12, xl: 3 }}>
                            <VStack h="100%" spacing={4} align="stretch">
                                <HeatMapChart widgetName="330G-TK-06 Phosphoric Acid Dosing Tank Drive Status" 
                                ColumnNumbers = {3}
                                tiles={[
                                    { name: "330G-RP-10D Pump", tagName: "330G_TK_06_OUT_PumpD_Status" },
                                    { name: "330G-RP-10S Pump", tagName: "330G_TK_06_OUT_PumpS_Status" },
                                    { name: "330G-VP-03 Sumpf Pump", tagName: "330G_TK_06_OUT_Sumpf_Pump1_Status" },
                                ]}/> 
                                 <TrendSeries_MultiTag widgetName="330G-TK-06 Phosphoric Acid Preparation Tank" tagNames={["330G_TK_02_ID_LVLA"]} trendNames={["Level A, %"]} timePeriodInHours={24} />
                            </VStack>
                            

                        </GridItem>
                        

                       


                    </Grid>

                </Box> 



            </VStack>


        </VStack>
    );
};

export default FlotationReagentPage;
