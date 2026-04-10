import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag";
import HeatMapChart from "../components/widgets/HeatMapChart";
import Widget_SingleValue from "../components/widgets/Widget_SingleValue";
import BarChart from "../components/widgets/BarChart";
import TableWithTimeStamp from "../components/widgets/TableWithTimeStamp";

const ProductFiltrationAreaPage = () => {
    return (
        <VStack spacing={6} align="stretch" p={6}>
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>240-Product Filtration Area</Heading>
            </Box>

            <VStack spacing={6} align="stretch" p={6}>
                <Box>
                    <Grid
                        templateColumns="repeat(6, 1fr)" // Creates 4 equal-width columns
                        gap={6}
                    >

                        <GridItem colSpan={{ base: 6, xl: 1 }}>
                            <VStack h="100%" spacing={4} align="stretch">
                                <Widget_SingleValue
                                    widgetName="Output Filter Dry Feed Rate"
                                    apiType="API_Actual"
                                    items={[{ label: "Feed Rate", tagName: "SL3_OUT_Out_Dry_W", unit: "t/h" }]}
                                />
                                <HeatMapChart
                                    widgetName="240G-SU-01 Sump Drives" ColumnNumbers={2}
                                    tiles={[
                                        { name: "240G-VP-03D Pump", tagName: "240_VP_01_02_OUT_Sumpf_Pump1_Status" },
                                        { name: "240G-VP-03S Pump", tagName: "240_VP_01_02_OUT_Sumpf_Pump2_Status" },
                                    ]}
                                />

                            </VStack>
                        </GridItem>

                        <GridItem colSpan={{ base: 6, xl: 1 }}>
                            <VStack h="100%" spacing={4} align="stretch">
                                <Widget_SingleValue
                                    widgetName="CS1 (240G-CV-01) Conveyer"
                                    apiType="API_Actual"
                                    items={[
                                        { label: "Moisture", tagName: "CS1_ID_Moist", unit: "%" },
                                        { label: "Turbidity", tagName: "CS1_ID_Turb", unit: "NTU" },
                                    ]}
                                />
                                <HeatMapChart
                                    widgetName="CS1 Conv Drive Status" ColumnNumbers={1}
                                    tiles={[
                                        { name: "CS1 (240G-CV-01) Conveyer", tagName: "CS1_ID_Status" }, 
                                    ]}
                                />

                            </VStack> 
                        </GridItem>

                        <GridItem colSpan={{ base: 6, xl: 1 }}>
                            <VStack h="100%" spacing={4} align="stretch">
                                <Widget_SingleValue
                                    widgetName="CS2 (240G-CV-01) Conveyer"
                                    apiType="API_Actual"
                                    items={[
                                        { label: "Moisture", tagName: "CS2_ID_Moist", unit: "%" },
                                        { label: "Turbidity", tagName: "CS2_ID_Turb", unit: "NTU" },
                                    ]}
                                />
                                <HeatMapChart
                                    widgetName="CS2 Conv Drive Status" ColumnNumbers={1}
                                    tiles={[
                                        { name: "CS2 (240G-CV-01) Conveyer", tagName: "CS2_ID_Status" }, 
                                    ]}
                                />


                            </VStack> 
                        </GridItem>

                        <GridItem colSpan={{ base: 6, xl: 1 }}>
                            <VStack h="100%" spacing={4} align="stretch">
                                <Widget_SingleValue
                                    widgetName="CS3 (240G-CV-01) Conveyer"
                                    apiType="API_Actual"
                                    items={[
                                        { label: "Moisture", tagName: "CS3_ID_Moist", unit: "%" },
                                        { label: "Turbidity", tagName: "CS3_ID_Turb", unit: "NTU" },
                                    ]}
                                />
                                <HeatMapChart
                                    widgetName="CS3 Conv Drive Status" ColumnNumbers={1}
                                    tiles={[
                                        { name: "CS3 (240G-CV-01) Conveyer", tagName: "CS3_ID_Status" }, 
                                    ]}
                                />
                            </VStack> 
                        </GridItem>

                        <GridItem colSpan={{ base: 6, xl: 1 }}>
                            <VStack h="100%" spacing={4} align="stretch">
                                <Widget_SingleValue
                                    widgetName="CS4 (240G-CV-01) Conveyer "
                                    apiType="API_Actual"
                                    items={[
                                        { label: "Moisture", tagName: "CS4_ID_Moist", unit: "%" },
                                        { label: "Turbidity", tagName: "CS4_ID_Turb", unit: "NTU" },
                                    ]}
                                />
                                <HeatMapChart
                                    widgetName="CS4 Conv Drive Status" ColumnNumbers={1}
                                    tiles={[
                                        { name: "CS4 (240G-CV-01) Conveyer", tagName: "CS4_ID_Status" }, 
                                    ]}
                                />

                            </VStack> 
                        </GridItem>
                        
                        <GridItem colSpan={{ base: 6, xl: 1 }}>
                            <TableWithTimeStamp
                                widgetName="Product Filtration Lab Quality"
                                items={[ 
                                    { label: "BPL", tagName: "PlantA_ID_Out_M_FinalProduct_Conce_BPL", unit: "%" },
                                    { label: "CaO", tagName: "PlantA_ID_Out_M_FinalProduct_Conce_CaO", unit: "%" },
                                    { label: "Cd", tagName: "PlantA_ID_Out_M_FinalProduct_Conce_Cd", unit: "ppm" },
                                    { label: "CO2", tagName: "PlantA_ID_Out_M_FinalProduct_Conce_CO2", unit: "%" },
                                    { label: "H2O", tagName: "PlantA_ID_Out_M_FinalProduct_Conce_H2O", unit: "%" },
                                    { label: "MgO", tagName: "PlantA_ID_Out_M_FinalProduct_Conce_MgO", unit: "%" },
                                    { label: "SiO2", tagName: "PlantA_ID_Out_M_FinalProduct_Conce_SiO2", unit: "%" },
                                ]}
                            />

                        </GridItem> 
                    </Grid> 
                </Box> 




                <Box>
                    <Grid
                        templateColumns="repeat(3, 1fr)" // Creates 4 equal-width columns
                        gap={6}
                    >

                        <GridItem>
                            <TrendSeries_MultiTag
                                widgetName="240G-SU-01 Primary Sump"
                                tagNames={["240_VP_01_02_ID_Sumpf_LVL1", "240_VP_01_02_ID_Sumpf_LVL2"]}
                                trendNames={["Level A, %", "Level B, %"]}
                                timePeriodInHours={8}
                            />
                        </GridItem>

                        <GridItem>
                            <TrendSeries_MultiTag
                                widgetName="240G-SU-02 Secondary Sump"
                                tagNames={["240_VP_01_02_ID_Sumpf_LVL3"]}
                                trendNames={["Level A, %"]}
                                timePeriodInHours={8}
                            />
                        </GridItem>

                        
                        <GridItem>
                            <BarChart
                                widgetName="Product Filtration PSD"
                                apiType="API_Actual"
                                items={[
                                    { label: "Less 40 µm", tagName: "PlantA_ID_Out_M_FinalProduct_PSD_less40" },
                                    { label: "40 µm", tagName: "PlantA_ID_Out_M_FinalProduct_PSD_40" },
                                    { label: "160 µm", tagName: "PlantA_ID_Out_M_FinalProduct_PSD_160" },
                                    { label: "200 µm", tagName: "PlantA_ID_Out_M_FinalProduct_PSD_200" },
                                    { label: "3150 µm", tagName: "PlantA_ID_Out_M_FinalProduct_PSD_3150" },
                                ]}
                            />
                        </GridItem>



                    </Grid>

                </Box>
            </VStack>
  
                <GridItem colSpan={{ base: 12, md: 6, xl: 3 }}>

                </GridItem>
                
        </VStack>
    );
};

export default ProductFiltrationAreaPage;
