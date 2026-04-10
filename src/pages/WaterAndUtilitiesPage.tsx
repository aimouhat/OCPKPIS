import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag";
import HeatMapChart from "../components/widgets/HeatMapChart";

const WaterAndUtilitiesPage = () => {
    return (
        <VStack spacing={6} align="stretch" p={6}>
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>510-Water and Utilities</Heading>
            </Box>

            <VStack spacing={6} align="stretch" p={6}>

                <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>
                <Heading size="md" mb={4} textAlign="center" >Process Water Basin</Heading>
                    <Grid templateColumns="repeat(14, 1fr)" gap={6}>
                        
                        <GridItem colSpan={{ base: 14, xl: 2 }}>
                            <HeatMapChart ColumnNumbers={2}
                                widgetName="510G-BS-01 Process Water Basin Drive Status"
                                tiles={[
                                    { name: "510G-VP-01D Pump", tagName: "510G_BS_01_OUT_Sumpf_Pump1_Status" },
                                    { name: "510G-VP-01S Pump", tagName: "510G_BS_01_OUT_Sumpf_Pump2_Status" },
                                ]}
                            />
                        </GridItem>

                        <GridItem colSpan={{ base: 14, xl: 2 }}>
                            <HeatMapChart ColumnNumbers={2}
                                widgetName="510G Pump Station Drive Status"
                                tiles={[
                                    { name: "510G-WP-01D Pump", tagName: "510G_BS_01_OUT_Pump2_Status" },
                                    { name: "510G-WP-01S Pump", tagName: "510G_BS_01_OUT_Pump1_Status" },
                                ]}
                            />
                        </GridItem>

                      

                        <GridItem colSpan={{ base: 14, xl: 8 }}>
                            <HeatMapChart
                                widgetName="510G-BS-01 Process Water Basin Tank Drive Status"
                                ColumnNumbers = {4}
                                tiles={[
                                    { name: "510G-WP-02D Pump", tagName: "510G_BS_01_OUT_Pump3_Status" }, // Reusing tag as per spec
                                    { name: "510G-WP-02S Pump", tagName: "510G_BS_01_OUT_Pump4_Status" }, // Reusing tag as per spec
                                    { name: "510G-WP-03 Pump", tagName: "510G_BS_01_OUT_Pump5_Status" },
                                    { name: "510G-WP-04 Pump", tagName: "510G_BS_01_OUT_Pump6_Status" },
                                ]}
                            />
                        </GridItem>

                        <GridItem colSpan={{ base: 12, xl: 3 }}>
                        <TrendSeries_MultiTag
                            widgetName="510G-BS-01 Process Water Basin"
                            tagNames={["510G_BS_01_ID_LVLA", "510G_BS_01_ID_LVLB","510G_BS_01_Pump_Regulation_Press","510G_BS_01_ID_Out2_Q"]}
                            trendNames={["Basin Level A, %", "Basin Level B, %","Pump Regulation Pressure, bar","Process Water Discharge Flow, bar"]}
                            timePeriodInHours={24}
                        />
                        </GridItem>


                        <GridItem colSpan={{ base: 12, xl: 3 }}>
                        <TrendSeries_MultiTag
                            widgetName="HP Process Water Pump Discharge Pressure,bar"
                            tagNames={["510G_BS_01_HP_Discharge_Press1","510G_BS_01_HP_Discharge_Press2"]}
                            trendNames={["HP Discharge Pressure1, bar","HP Discharge Pressure2, bar"]}
                            timePeriodInHours={24}
                        />
                        </GridItem>

                        <GridItem colSpan={{ base: 12, xl: 3 }}>
                        <TrendSeries_MultiTag
                            widgetName="LP Process Water Pump Discharge Pressure,bar"
                            tagNames={["510G_BS_01_LP_Discharge_Press1","510G_BS_01_LP_Discharge_Press2","510G_BS_01_LP_Discharge_Press3","510G_BS_01_LP_Discharge_Press4"]}
                            trendNames={["LP Discharge Pressure1, bar","LP Discharge Pressure2, bar","LP Discharge Pressure3, bar","LP Discharge Pressure4, bar"]}                   
                            timePeriodInHours={24}
                        />
                        </GridItem>

                        <GridItem colSpan={{ base: 12, xl: 3 }}>
                        <TrendSeries_MultiTag
                            widgetName="Gear Box Temperature,deg C"
                            tagNames={["510G_BS_01_Gear_Box_Temp1","510G_BS_01_Gear_Box_Temp2","510G_BS_01_Gear_Box_Temp3","510G_BS_01_Gear_Box_Temp4"]}
                            trendNames={["Gear Box Tempure1, deg C","Gear Box Tempure2, deg C","Gear Box Tempure3, deg C","Gear Box Tempure4, deg C"]}                   
                            timePeriodInHours={24}
                        />
                        </GridItem>




                    </Grid>


                </Box>

                 



                <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>
                <Heading size="md" mb={4} textAlign="center" >Raw Water Basin</Heading>

                <Grid templateColumns="repeat(14, 1fr)" gap={6}>
                        
                        <GridItem colSpan={{ base: 14, xl: 2 }}>
                            <HeatMapChart ColumnNumbers={1}
                                widgetName="520G-BS-01 Raw Water Basin Drive Status"
                                tiles={[
                                    { name: "520G-VP-01 Pump", tagName: "520G_BS_01_OUT_Sumpf_Pump1_Status" },
                                ]}
                            />
                        </GridItem>

                        <GridItem colSpan={{ base: 14, xl: 2 }}>
                            <HeatMapChart ColumnNumbers={2}
                                widgetName="520G Pump Station Drive Status"
                                tiles={[
                                    { name: "520G-WP-01D Pump", tagName: "520G_BS_01_OUT_PumpD_Status" },
                                    { name: "520G-WP-01S Pump", tagName: "520G_BS_01_OUT_PumpS_Status" },
                                ]}
                            />
                        </GridItem>


                        <GridItem colSpan={{ base: 12, xl: 3 }}>
                        <TrendSeries_MultiTag
                            widgetName="520G-BS-01 Raw Water Basin"
                            tagNames={["520G_BS_01_ID_LVLA", "520G_BS_01_ID_LVLB","520G_BS_01_Pump_Regulation_Press","520G_BS_01_ID_Out1_Q"]}
                            trendNames={["Basin Level A, %", "Basin Level B, %","Pump Regulation Pressure, bar","Raw Water Discharge Flow, m3/hr"]}
                            timePeriodInHours={24}
                        />
                        </GridItem>


                        <GridItem colSpan={{ base: 12, xl: 3 }}>
                        <TrendSeries_MultiTag
                            widgetName="HP Raw Water Pump Discharge Pressure,bar"
                            tagNames={["520G_BS_01_HP_Discharge_Press1","520G_BS_01_HP_Discharge_Press2"]}
                            trendNames={["HP Discharge Pressure1, bar","HP Discharge Pressure2, bar"]}
                            timePeriodInHours={24}
                        />
                        </GridItem>


                        <GridItem colSpan={{ base: 12, xl: 3 }}>
                        <TrendSeries_MultiTag
                            widgetName="Gear Box Temperature,deg C"
                            tagNames={["520G_BS_01_Gear_Box_Temp1","520G_BS_01_Gear_Box_Temp2"]}
                            trendNames={["Gear Box Tempure1, deg C","Gear Box Tempure2, deg C"]}                   
                            timePeriodInHours={24}
                        />
                        </GridItem>




                    </Grid>

                </Box>

                <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>
                <Heading size="md" mb={4} textAlign="center" >Seal Water Tank</Heading>
                <Grid templateColumns="repeat(14, 1fr)" gap={6}>
                        
                        <GridItem colSpan={{ base: 14, xl: 2 }}>
                            <HeatMapChart ColumnNumbers={2}
                                widgetName="520G-TK-02 Seal Water Basin Drive Status"
                                tiles={[
                                    { name: "520G-WP-07D Pump", tagName: "520G_TK_02_OUT_Pump1_Status" },
                                    { name: "520G-WP-07S Pump", tagName: "520G_TK_02_OUT_Pump2_Status" },
                                ]}
                            />
                        </GridItem>


                      

                        <GridItem colSpan={{ base: 14, xl: 2 }}>
                            <HeatMapChart ColumnNumbers={4}
                                widgetName="520G Seal Water Booster Drive Status"
                                
                                tiles={[
                                    { name: "520G-WP-08D Pump", tagName: "520G_TK_02_OUT_Pump3_Status" }, // Reusing tag as per spec
                                    { name: "520G-WP-08S Pump", tagName: "520G_TK_02_OUT_Pump4_Status" }, // Reusing tag as per spec
                                    { name: "520G-WP-09D Pump", tagName: "520G_TK_02_OUT_Pump5_Status" },
                                    { name: "520G-WP-09S Pump", tagName: "520G_TK_02_OUT_Pump6_Status" },
                                ]}
                            />
                        </GridItem>

                        <GridItem colSpan={{ base: 12, xl: 3 }}>
                        <TrendSeries_MultiTag
                            widgetName="520G-TK-02 Seal Water Basin"
                            tagNames={[
                                "520G_TK_02_ID_LVLA",
                                "520G_TK_02_ID_LVLB",
                                "520G_TK_02_Pump_Regulation_Press",
                                "520G_TK_02_ID_Out2_Q"]}
                            trendNames={[
                                "Basin Level A, %", 
                                "Basin Level B, %",
                                "Pump Regulation Pressure, bar",
                                "Seal Water Discharge Flow, m3/hr"]}
                            timePeriodInHours={24}
                        />
                        </GridItem>


                        <GridItem colSpan={{ base: 12, xl: 3 }}>
                        <TrendSeries_MultiTag
                            widgetName="HP Seal Water Pump Discharge Pressure,bar"
                            tagNames={["520G_TK_02_HP_Discharge_Press1","520G_TK_02_HP_Discharge_Press2"]}
                            trendNames={["HP Discharge Pressure1, bar","HP Discharge Pressure2, bar"]}
                            timePeriodInHours={24}
                        />
                        </GridItem>
						
						 <GridItem colSpan={{ base: 12, xl: 3 }}>
                        <TrendSeries_MultiTag
                            widgetName="Compressure Pressure,bar"
                            tagNames={["550G_AC_01_Air_Discharge_Press","550G_AC_01_Instruent_Discharge_Press"]}
                            trendNames={["Plant Air Discharge Pressure, bar","Instrument Discharge Pressure, bar"]}
                            timePeriodInHours={24}
                        />
                        </GridItem>

                       




                    </Grid>
                </Box>



            </VStack>

             
                

 
        </VStack>
    );
};

export default WaterAndUtilitiesPage;
