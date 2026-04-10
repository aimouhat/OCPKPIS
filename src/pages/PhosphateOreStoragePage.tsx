import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import HeatMapChart from "../components/widgets/HeatMapChart";
import Widget_SingleValue from "../components/widgets/Widget_SingleValue";
import TableWithTimeStamp from "../components/widgets/TableWithTimeStamp"; // Import the new widget
import BarChart from "../components/widgets/BarChart";

const PhosphateOreStoragePage = () => {
    return (
        <VStack spacing={6} align="stretch" p={6}>
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>110-Phosphate Ore Storage and 120-Reclaiming Area</Heading>
            </Box>

            <VStack spacing={6} align="stretch" p={6}> 
                <Box>
                    <Grid templateColumns="repeat(14, 1fr)" gap={6}>
                        <GridItem colSpan={{ base: 14, xl: 5 }}>
                            <VStack h="100%" spacing={4} align="stretch">
                                <GridItem>
                                    <Widget_SingleValue widgetName="Specific Energy Consumption" 
                                    apiType="API_Actual" 
                                    items={[{ label: "Specific Energy Consumption , kWt/t stacked Ore", tagName: "110G_ST_01_OUT_SpecificEnergyConsumption", unit: "kWt/t" },
                                            { label: "Specific Energy Consumption, kWt /t Reclaimed Ore", tagName: "120G_RC_01_OUT_SpecificEnergyConsumption", unit: "kWt/t" },
                                    ]} />
                                </GridItem>
                                
                                <GridItem>
                                    <Widget_SingleValue widgetName="Inload Stockyards Product Available" apiType="API_Actual" items={[
                                        { label: "Inload Stockyard", tagName: "120G_RC_01_OUT_SY_CurrentCapacity", unit: "Tonnes" },
                                        { label: "Inload Stockyard", tagName: "120G_RC_01_OUT_SY_CurrentCapacityPercentage", unit: "%" },
                                    ]}/>
                                </GridItem> 
                                
                                <GridItem>
                                    <Widget_SingleValue widgetName="110G-ST-01 Stacker" apiType="API_Actual" items={[
                                        { label: "Luffing position of boom conveyor", tagName: "110G_ST_01_ID_BoomConv_LuffingPosition", unit: " " },
                                        { label: "Stacker travel position", tagName: "110G_ST_01_ID_TravelPosition", unit: " " },
                                    ]}/>
                                </GridItem>  


                                <GridItem>
                                    <HeatMapChart widgetName="110G-ST-01 Stacker Status" 
                                    ColumnNumbers = {2}
                                    tiles={[
                                        { name: "Emergency stop", tagName: "110G_ST_01_ID_EmergStop_CollapsTripper" },
                                        { name: "Firealarm", tagName: "110G_ST_01_ID_FireAlarm" },
                                        { name: "General alarm misalignment", tagName: "110G_ST_01_ID_MisalignmentAlarm" },
                                        { name: "General warning misalignment", tagName: "110G_ST_01_ID_MisalignmentWarning" },
                                        { name: "Hardwired interlock with feeding MV",   tagName: "110G_ST_01_ID_HardInterlock_MVpanel" }, 
                                        { name: "Safety relais status OK", tagName: "110G_ST_01_ID_SafetyRelaisOk" },
                                        { name: "Stacker in bypass mode", tagName: "110G_ST_01_ID_InBypassMode" },
                                        { name: "Stacker in remote", tagName: "110G_ST_01_ID_InRemote" },
                                        { name: "Stacker ready", tagName: "110G_ST_01_ID_Ready" },
                                        { name: "Stacker run feedback", tagName: "110G_ST_01_ID_RunFeedback" },
                                        { name: "Stacker state", tagName: "110G_ST_01_ID_State" }, 
                                    ]} />
                                </GridItem> 
                                

                                <GridItem>
                                <HeatMapChart widgetName="120G Conveyers Drive Status" 
                                ColumnNumbers = {4}
                                tiles={[
                                    { name: "RB1 Conveyer", tagName: "RB1_OUT_Status" },
                                    { name: "RB2 Conveyer", tagName: "RB2_OUT_Status" },
                                    { name: "RB2' Conveyer", tagName: "RB3_OUT_Status" },
                                    { name: "CB1 Conveyer", tagName: "CB1_OUT_Status" },
                                    { name: "CB2 Conveyer", tagName: "CB2_OUT_Status" },
                                    { name: "CB5 Conveyer", tagName: "CB5_OUT_Status" },
                                    { name: "SB1 Conveyer", tagName: "SB1_OUT_Status" },
                                ]} />
                            </GridItem>
                                
                            </VStack>

                        </GridItem>

                        <GridItem colSpan={{ base: 14, xl: 9 }}>
                            <VStack h="100%" spacing={4} align="stretch">
                            <Box>
                                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                                    <GridItem>
                                        <VStack h="100%" spacing={4} align="stretch">
                                            <Widget_SingleValue widgetName="120G-RC-01 Bucket Wheel Bearing Temperature" apiType="API_Actual" items={[
                                                { label: "Bearing 1", tagName: "120G_RC_01_ID_BucketWheel_HHBuring1_T", unit: "°C" },
                                                { label: "Bearing 2", tagName: "120G_RC_01_ID_BucketWheel_HHBuring2_T", unit: "°C" },
                                            ]}/>
                                            <Widget_SingleValue widgetName="120G-RC-01 Bucket Wheel Winding Temperature" apiType="API_Actual" items={[
                                                { label: "Winding U", tagName: "120G_RC_01_ID_BucketWheel_UHH_T", unit: "°C" },
                                                { label: "Winding V", tagName: "120G_RC_01_ID_BucketWheel_VHH_T", unit: "°C" },
                                                { label: "Winding W", tagName: "120G_RC_01_ID_BucketWheel_WHH_T", unit: "°C" },
                                            ]}/>
                                        </VStack>
                                    </GridItem> 
                                    
                                    <GridItem>
                                        <VStack h="100%" spacing={4} align="stretch">
                                            <Widget_SingleValue widgetName="Inload 120G-RC-01 Reclaimer" apiType="API_Actual" items={[
                                                { label: "Percent availability", tagName: "120G_RC_01_OUT_AvailablityPercentage", unit: "%" },
                                                { label: "Percent downtime", tagName: "120G_RC_01_OUT_DowntimePercentage", unit: "%" },
                                                { label: "Percentage of time within 5% of max design", tagName: "120G_RC_01_OUT_MaxFeedRate", unit: "%" },
                                                { label: "Reclaimer Dry Feed Rate", tagName: "120G_RC_01_OUT_Out_Dry_W", unit: "t/h" },
                                            ]}/>
                                            <Widget_SingleValue widgetName="Inload Stacker 110G-ST-01" apiType="API_Actual" items={[
                                                                        { label: "Percent availability", tagName: "110G_ST_01_OUT_AvailablityPercentage", unit: "%" },
                                                                        { label: "Percent downtime", tagName: "110G_ST_01_OUT_DowntimePercentage", unit: "%" },
                                                                    ]}/>
                                        </VStack>
                                    </GridItem> 
 

                                    <GridItem>
                                    <VStack h="100%" spacing={4} align="stretch">
                                        <HeatMapChart widgetName="120G-RC-01 Reclaimer Status" 
                                        ColumnNumbers = {1}
                                        tiles={[
                                            { name: "Reclaimer state", tagName: "120G_RC_01_OUT_Status" }, 
                                            
                                        ]} />

                                        <Widget_SingleValue widgetName="120G-RC-01 Reclaimer Position" apiType="API_Actual" items={[ 
                                                                    { label: "Travel position machine", tagName: "120G_RC_01_ID_RakePos1", unit: "m" },
                                                                    { label: "Rake #1 position", tagName: "120G_RC_01_ID_RakePos1", unit: "m" },
                                                                    { label: "Rake #2 position", tagName: "120G_RC_01_ID_RakePos2", unit: "m" },
                                                                    { label: "Rake chain #1 angle", tagName: "120G_RC_01_ID_RakeChain1Angle", unit: "degree" },
                                                                    { label: "Rake chain #2 angle", tagName: "120G_RC_01_ID_RakeChain2Angle", unit: "degree" },
                                                                    { label: "Rake chain #3 angle", tagName: "120G_RC_01_ID_RakeChain3Angle", unit: "degree" },
                                                                    { label: "Rake chain #4 angle", tagName: "120G_RC_01_ID_RakeChain4Angle", unit: "degree" },
                                                                ]}/>
                                                                </VStack>

                                    </GridItem> 


                                </Grid>


                            </Box>
                            <GridItem>
                                <HeatMapChart widgetName="120G-RC-01 Reclaimer Status" 
                                ColumnNumbers = {5}
                                tiles={[
                                    { name: "Alarm misalignment Left", tagName: "120G_RC_01_ID_MisalignmentAlarm_Left" },
                                    { name: "Alarm misalignment Right", tagName: "120G_RC_01_ID_MisalignmentAlarm_Right" },
                                    { name: "Firealarm", tagName: "120G_RC_01_ID_FireAlarm" },
                
                                    { name: "Reclaimer in remote", tagName: "120G_RC_01_ID_InRemote" },
                                    { name: "Reclaimer ready", tagName: "120G_RC_01_ID_Ready" },
                                    { name: "Reclaimer run feedback", tagName: "120G_RC_01_ID_RunFeedback" },
            
                                    { name: "Safety relais status OK", tagName: "120G_RC_01_ID_SafetyRelaisOk" },
                                    { name: "Warning misalignment right on Outload conveyer", tagName: "120G_RC_01_ID_MisalignmentWarning_Right" },
                                    { name: "Warning misalignment left on Outload conveyer", tagName: "120G_RC_01_ID_MisalignmentWarning_Left" },
                                    
                                ]} />
                            </GridItem> 
 
                            <Grid templateColumns="repeat(6, 1fr)" gap={6}>
                                    <GridItem colSpan={{ base: 6, xl: 3 }}> 
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
                                    </GridItem>

                                    <GridItem colSpan={{ base: 6, xl: 3 }}>
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
                                    
                                    </GridItem> 
                            </Grid>



                            
                                


                                

                            



                            



                        </VStack>

                        </GridItem>
                    
                   

                    </Grid>
                </Box>
                    
               
                    
                    



    

                 

            </VStack>

        </VStack>
    );
};

export default PhosphateOreStoragePage;

