import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import DownTimeHeatMap from "../components/widgets/DownTimeHeatMap";

const DowntimeKpiPage = () => {
    // Calculate the start and end times for the data request
    const endTime = new Date();
    const startTime = new Date();
    startTime.setDate(endTime.getDate() - 14); // Set start time to 2 weeks ago

    // Define the list of assets to display on the heatmap
    const assetNames = [
        // "Water_and_Utilities_Area", "Tailings_Thickener_and_Flocculant_Preparation", "Tailings_Handling_and_Storage_Area","Outload_Reclaiming_Line", "Outload_Delivery_Line",
        
        "Inload_Stacking_Line", "Inload_Reclaiming_Line", "Main_Plant_Line", "Outload_Reclaiming_Line", "Outload_Delivery_Line", 
        "SB1", "RL3", "RL2", "RL1", "RB3", "RB2", "RB1", 
        //"Main_Plant_Line", "Inload_Stacking_Line", "Inload_Reclaiming_Line", "Ester_Preparation_Line", "Amine_Preparation_Line", "Acid_Preparation_Line",
        "CS4", "CS3", "CS2", "CS1", "CB5", "CB3", "CB2", "CB1", "EL2", "EL1",
        "310A_AC_09_12", "310A_AC_05_08", "310A_AC_01_04", "220A_HS_03", "220A_HS_02", "220A_HS_01",
        "160G_TC_BC_01S", "160G_TC_BC_01D", "140G_RC_01", "130G_WP_01_02", "120G_RC_01", "110G_ST_01",
        //"Compressor_Air_Services_Utility_Area"
    ];

    return (
        <VStack spacing={6} 
        align="stretch" 
        p={6}
        h="100vh"
        
        >
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>Downtime KPI</Heading>
            </Box>

            <Box  > 
                        <DownTimeHeatMap
                            widgetName="Assets Downtime Hours by Cause"
                            assetNames={assetNames}
                            startTime={startTime.toISOString()}
                            endTime={endTime.toISOString()}
                        />  
                           
            </Box>
        </VStack>
    );
};

export default DowntimeKpiPage;

