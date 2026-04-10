import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Widget_SingleValue from "../components/widgets/Widget_SingleValue";
import Grid_KPI from "../components/widgets/Grid_KPI";
import HeatMapChart from "../components/widgets/HeatMapChart";
import BarChart from "../components/widgets/BarChart";
import TableWithTimeStamp from "../components/widgets/TableWithTimeStamp"; // Import the new widget

const CoarseRejectAreaPage = () => {
    return (
        <VStack spacing={6} align="stretch" p={6}>
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>Coarse Reject Area</Heading>
            </Box>

            <VStack spacing={6} align="stretch" p={6}> 
                <Box>
                    <Grid
                        templateColumns="repeat(12, 1fr)" // Creates 3 equal-width columns
                        gap={6}
                    > 

                <GridItem colSpan={{ base: 12, xl: 8 }}>
                    <BarChart
                        widgetName="Coarse Reject PSD"
                        apiType="API_Actual"
                        items={[
                            { label: "Less 40 μm", tagName: "Coarse_Reject_Handling_Area_ID_M_Sterile_less40" },
                            { label: "40 μm", tagName: "Coarse_Reject_Handling_Area_ID_M_Sterile_40" },
                            { label: "160 μm", tagName: "Coarse_Reject_Handling_Area_ID_M_Sterile_160" },
                            { label: "200 μm", tagName: "Coarse_Reject_Handling_Area_ID_M_Sterile_200" },
                            { label: "3150 μm", tagName: "Coarse_Reject_Handling_Area_ID_M_Sterile_3150" },
                        ]}
                    />
                </GridItem>
                 
                <GridItem colSpan={{ base: 12, md: 4 }}>
                    <VStack h="100%" spacing={4} align="stretch">

                                            <TableWithTimeStamp
                        widgetName="Coarse Reject Quality Lab"
                        items={[
                            { label: "BPL,%", tagName: "Coarse_Reject_Handling_Area_ID_M_Sterile_Conce_BPL" },
                            { label: "Moisture,%", tagName: "Coarse_Reject_Handling_Area_ID_M_Sterile_Conce_H2O" },
                            { label: "Cd, ppm", tagName: "Coarse_Reject_Handling_Area_ID_M_Sterile_Conce_Cd" },
                        ]}
                    />
                    <Widget_SingleValue
                        widgetName="CT2 Coars Reject Feed Rate"
                        apiType="API_Actual"
                        items={[{ label: "CT2 Coars Reject Feed Rate", tagName: "CT2_D_OUT_Out_Dry_W", unit:"t/h" }]}
                    />
                    <Widget_SingleValue
                        widgetName="CT2' Coars Reject Feed Rate"
                        apiType="API_Actual"
                        items={[{ label: "CT2' Coars Reject Feed Rate", tagName: "CT2_S_OUT_Out_Dry_W", unit:"t/h" }]}
                    />
					<Widget_SingleValue
                        widgetName="Total Coars Reject Feed Rate"
                        apiType="API_Actual"
                        items={[{ label: "Total Coars Reject Feed Rate", tagName: "210A_SC01_Out_Dry_W", unit:"t/h" }]}
                    />


                    </VStack>



                </GridItem> 

                <GridItem colSpan={{ base: 12, xl: 12 }}>
                    <HeatMapChart
                        widgetName="Conveyer Drive Status"
                        ColumnNumbers = {6}
                        tiles={[
                            { name: "CT1", tagName: "CT1_D_OUT_Status" },
                            { name: "CT1'", tagName: "CT1_S_OUT_Status" },
                            { name: "CT2", tagName: "CT2_OUT_Status" },
                            { name: "CT2'", tagName: "CT2_S_OUT_Status" },
                            { name: "T1", tagName: "T1_D_OUT_Status" },
                            { name: "T1'", tagName: "T1_S_OUT_Status" },
                        ]}
                    />
                </GridItem>





                    </Grid>
                    
                </Box>

            </VStack>
 


             
        </VStack>
    );
};

export default CoarseRejectAreaPage;
