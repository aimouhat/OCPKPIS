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
import HeatMapChart from "../components/widgets/HeatMapChart";
import AlarmHistoryGridWidget from "../components/widgets/AlarmHistoryGridWidget";



const MaintenancePage = () => {


    return (
        <VStack spacing={6} align="stretch" p={6}>

            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>Maintenance Dashboard</Heading>
            </Box>
            
            <Grid
                    templateColumns="repeat(4, 2fr)"  
                    gap={7}
                >
                    
                    <GridItem colSpan={{ base: 2, md: 2, xl: 2 }}>
                        <VStack h="100%" spacing={4} align="stretch"> 
                            
                            <AlarmHistoryGridWidget
                                widgetName="Last Active Alarms (from Dynamo)" 
                                limit={20}
                            />

                            <TrendSeries_MultiTag
                                widgetName="Import Feed Rate, t/h (12h)"
                                tagNames={["PlantA_OUT_Import_W", "PlantA_ID_PlantA_Import_W_Target"]}
                                trendNames={["Actual", "Target"]}
                                timePeriodInHours={12}
                            />
                        </VStack>
                    </GridItem>  
  
                    <GridItem colSpan={{ base: 2, md: 2, xl: 2 }}>
                        <VStack h="100%" spacing={4} align="stretch"> 

                            <TrendSeries_MultiTag
                            widgetName="Plant Input Feed Rate, t/h (12h)"
                            tagNames={["PlantA_OUT_In_W", "PlantA_OUT_In_W_Target"]}
                            trendNames={["Actual", "Target"]}
                            timePeriodInHours={12}
                            /> 

                            <TrendSeries_MultiTag
                            widgetName="Plant Output Feed Rate, t/h (12h)"
                            tagNames={["PlantA_OUT_Out_W", "PlantA_OUT_Out_W_Target"]}
                            trendNames={["Actual", "Target"]}
                            timePeriodInHours={12}
                            />  

                            <TrendSeries_MultiTag
                            widgetName="Export Feed Rate, t/h (12h)"
                            tagNames={["PlantA_OUT_Export_W", "PlantA_ID_PlantA_Export_W_Target"]}
                            trendNames={["Actual", "Target"]}
                            timePeriodInHours={12}
                            /> 
                        </VStack>
                    </GridItem>  

            </Grid> 

                
                <GridItem colSpan={{ base: 12, md: 3, xl: 3 }}>
                    <HeatMapChart
                        widgetName="Lines Status"
                        ColumnNumbers = {5}
                        tiles={[
                            { name: "Inload Stacking Line", tagName: "Inload_Stacking_Line_Status" },
                            { name: "Inload Reclaiming Line", tagName: "Inload_Reclaiming_Line_Status" },
                            { name: "Main Plant Line", tagName: "Main_Plant_Line_Status" },
                            { name: "Outload Reclaiming Line", tagName: "Outload_Reclaiming_Line_Status" },
                            { name: "Outload Delivery Line", tagName: "Outload_Delivery_Line_Status" },
                        ]}
                    />
                </GridItem> 
                

 
        </VStack>
    );
};

export default MaintenancePage;



