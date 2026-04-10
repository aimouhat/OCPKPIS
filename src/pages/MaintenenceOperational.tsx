import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import DowntimeStackedColumnWidget from "../components/widgets/DowntimeStackedColumnWidget";

const MaintenancePage = () => {
    // Define the extensive list of assets for the widget
    const assetNames_Lines = [
        "Inload_Stacking_Line", 
        "Inload_Reclaiming_Line", 
        "Main_Plant_Line", 
        "Outload_Reclaiming_Line", 
        "Outload_Delivery_Line", 
    ];

    const assetNames_InloadStackingLine = [
        "CB1",
        "CB2", 
        "CB3", 
        "CB5",  
        "SB1",
        "110G_ST_01", 
    ];
    
    const assetNames_InloadReclaimingLine = [ 
        "120G_RC_01",
        "RB1",
        "RB2", 
        "RB3",  
    ];

    const assetNames_OutloadReclaimingLine = [ 
        "140G_RC_01",
        "RL1",
        "RL2", 
        "RL3", 
    ];

    const assetNames_OutloadDeliveryLine = [ 
        "EL1",
        "EL2", 
    ];

    const assetNames_MainPlantLine = [
                
        "CB1",
        "CB2", 
        "CB3", 
        "CB5",  
        "SB1",
        "110G_ST_01", 
        
        "160G_TC_BC_01S", 
        "160G_TC_BC_01D", 
        "140G_RC_01", 
        "130G_WP_01_02", 
        "220A_HS_03", 
        "220A_HS_02", 
        "220A_HS_01",
        "310A_AC_09_12", 
        "310A_AC_05_08", 
        "310A_AC_01_04", 
        "CS1", 
        "CS2", 
        "CS3", 
        "CS4", 

        "Water_and_Utilities_Area", 
        "Tailings_Thickener_and_Flocculant_Preparation", 
        "Tailings_Handling_and_Storage_Area",
        "SB1",

        "Amine_Preparation_Line",
        "Acid_Preparation_Line",

        "Compressor_Air_Services_Utility_Area"
    ];

    // Calculate the start and end time for the API request
    const endTime = new Date();
    const startTime = new Date();
    startTime.setDate(endTime.getDate() - 30); //30 days before now
    
    const startTime_12h = new Date();
    startTime_12h.setDate(endTime.getDate() - 7); // 2 weeks (14 days) before now

    return (
        <VStack spacing={6} align="stretch" p={6}>
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>Maintenance Operational</Heading>
            </Box>

            <VStack spacing={6} align="stretch" p={6}> 

                <Box   width={1800}>
                    <VStack spacing={6} align="stretch" p={6}>
                        <Grid
                            templateColumns="repeat(5, 2fr)" // Creates 3 equal-width columns
                            gap={6}
                        > 
                            <GridItem colSpan={{ base: 4, xl: 2 }}>
                                <DowntimeStackedColumnWidget
                                    widgetName="Lines (Last week)"
                                    assetNames={assetNames_Lines}
                                    startTime={startTime_12h.toISOString()}
                                    endTime={endTime.toISOString()}
                                />

                            </GridItem>

                            <GridItem colSpan={{ base: 4, xl: 3 }}>
                                <DowntimeStackedColumnWidget
                                    widgetName="Lines (Month)"
                                    assetNames={assetNames_Lines}
                                    startTime={startTime.toISOString()}
                                    endTime={endTime.toISOString()}
                                /> 
                            </GridItem> 
                            
                        </Grid>
                        

                        <Grid
                            templateColumns="repeat(4, 2fr)" // Creates 3 equal-width columns
                            gap={6}
                        > 
                            <GridItem colSpan={{ base: 5, xl: 1 }}>
                                <DowntimeStackedColumnWidget
                                    widgetName="Inload Stacking Line Key Assets"
                                    assetNames={assetNames_InloadStackingLine}
                                    startTime={startTime.toISOString()}
                                    endTime={endTime.toISOString()}
                                />

                            </GridItem>

                            <GridItem colSpan={{ base: 5, xl: 1 }}>
                                <DowntimeStackedColumnWidget
                                    widgetName="Inload Reclaiming Line Key Assets"
                                    assetNames={assetNames_InloadReclaimingLine}
                                    startTime={startTime.toISOString()}
                                    endTime={endTime.toISOString()}
                                /> 
                            </GridItem>

                            <GridItem colSpan={{ base: 5, xl: 1 }}>
                                <DowntimeStackedColumnWidget
                                    widgetName="Outload Reclaiming Line Key Assets"
                                    assetNames={assetNames_OutloadReclaimingLine}
                                    startTime={startTime.toISOString()}
                                    endTime={endTime.toISOString()}
                                /> 
                            </GridItem>

                            <GridItem colSpan={{ base: 5, xl: 1 }}>
                                <DowntimeStackedColumnWidget
                                    widgetName="Outload Delivery Line Key Assets"
                                    assetNames={assetNames_OutloadDeliveryLine}
                                    startTime={startTime.toISOString()}
                                    endTime={endTime.toISOString()}
                                /> 
                            </GridItem>
                            
                        </Grid>
                    </VStack>
                </Box>

                <Box>
                        
                    <DowntimeStackedColumnWidget
                        widgetName="Main Plant Line Key Assets (Month)"
                        assetNames={assetNames_MainPlantLine}
                        startTime={startTime.toISOString()}
                        endTime={endTime.toISOString()}
                    />

                </Box>

            </VStack>

        </VStack>
    );
};

export default MaintenancePage;

