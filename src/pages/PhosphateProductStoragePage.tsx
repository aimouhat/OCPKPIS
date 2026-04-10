import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import HeatMapChart from "../components/widgets/HeatMapChart";
import Widget_SingleValue from "../components/widgets/Widget_SingleValue";
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag";
import TableWithTimeStamp from "../components/widgets/TableWithTimeStamp"; // Import the new widget
import BarChart from "../components/widgets/BarChart";

const PhosphateProductStoragePage = () => {
    return (
        <VStack spacing={6} align="stretch" p={6}>
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>130-Phosphate Product Storage and 140-Reclaiming Area</Heading>
            </Box>

            <VStack spacing={6} align="stretch" p={6}> 
                <Box>
                    <Grid templateColumns="repeat(14, 1fr)" gap={6}>
                        <GridItem colSpan={{ base: 14, xl: 9 }}>
                            <VStack h="100%" spacing={4} align="stretch">

                                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                                    <GridItem>
                                                    
                                        <VStack h="100%" spacing={4} align="stretch">
                                            
                                                    <HeatMapChart widgetName="Reclaimer 140G-RC-01 Status" 
                                                    ColumnNumbers = {1}
                                                    tiles={[
                                                        { name: "Reclaimer status", tagName: "140G_RC_01_OUT_Status" }, 
                                                    ]} />

                                                    <GridItem>
                                                        <Widget_SingleValue widgetName="Specific Energy Consumption" apiType="API_Actual" items={[
                                                            { label: "Reclaimed Phosphate Product", tagName: "140G_RC_01_OUT_SpecificEnergyConsumption", unit: "kWt/t" },
                                                            { label: "Stacked Phosphate Product", tagName: "130G_ST_01_OUT_SpecificEnergyConsumption", unit: "kWt/t" },
                                                        ]}/>
                                                    </GridItem>
                                                    
                                                    <GridItem>
                                                        <Widget_SingleValue widgetName="Stockyards Product Available" apiType="API_Actual" items={[
                                                            { label: "Outload Stockyard Available Tonnes", tagName: "140G_RC_01_OUT_SY_CurrentCapacity", unit: "kWt/t" },
                                                            { label: "Outload Stockyard Available Percentage", tagName: "140G_RC_01_OUT_SY_CurrentCapacityPercentage", unit: "kWt/t" },
                                                        ]}/>
                                                    </GridItem>
                                                    
                                                    <GridItem>
                                                        <Widget_SingleValue widgetName="Bucket Wheel Bearing Temperature" apiType="API_Actual" items={[
                                                            { label: "Bearing 1", tagName: "140G_RC_01_ID_BucketWheel_HHBuring1_T", unit: "°C" },
                                                            { label: "Bearing 2", tagName: "140G_RC_01_ID_BucketWheel_HHBuring2_T", unit: "°C" },
                                                        ]}/>
                                                    </GridItem>
                                            
                                        </VStack>

                                    </GridItem>
               
                                    
                                    <GridItem>
                                        <VStack h="100%" spacing={4} align="stretch">

                                        <GridItem>
                                            <Widget_SingleValue widgetName="Reclaimer 140G-RC-01 KPI" apiType="API_Actual" items={[ 
                                                { label: "Reclaimer Dry Feed Rate, t/h", tagName: "140G_RC_01_OUT_Out_Dry_W", unit: "t/h" },
                                                { label: "Percent of Air Digging Time", tagName: "140G_RC_01_ID_AirDigTimePercentage", unit: "%" },
                                                { label: "Percent availability", tagName: "140G_RC_01_OUT_AvailablityPercentage", unit: "%" },
                                                { label: "Percent downtime", tagName: "140G_RC_01_OUT_DowntimePercentage", unit: "%" },
                                                { label: "Percentage of time within 5% of maximum design", tagName: "140G_RC_01_OUT_MaxFeedRate", unit: "%" },
                                            ]}/>
                                        </GridItem>
                                        

                                        <GridItem>
                                            <Widget_SingleValue widgetName="Bucket Wheel Winding Temperature" apiType="API_Actual" items={[
                                                { label: "Winding U", tagName: "140G_RC_01_ID_BucketWheel_UHH_T", unit: "°C" },
                                                { label: "Winding V", tagName: "140G_RC_01_ID_BucketWheel_VHH_T", unit: "°C" },
                                                { label: "Winding W", tagName: "140G_RC_01_ID_BucketWheel_WHH_T", unit: "°C" },
                                            ]}/>
                                        </GridItem>

                                        </VStack>
                                        
                                    </GridItem>
                                    
                                    <GridItem>
                                        <VStack h="100%" spacing={4} align="stretch">
                                            <GridItem>
                                                <Widget_SingleValue widgetName="Reclaimer Rakes Position" apiType="API_Actual" items={[
                                                    { label: "Position 1", tagName: "140G_RC_01_ID_RakePos1", unit: "m" },
                                                    { label: "Position 2", tagName: "140G_RC_01_ID_RakePos2", unit: "m" },
                                                    
                                                    { label: "Rake chain #1 angle", tagName: "140G_RC_01_ID_RakeChain1Angle", unit: "degree" },
                                                    { label: "Rake chain #2 angle", tagName: "140G_RC_01_ID_RakeChain2Angle", unit: "degree" },
                                                    { label: "Rake chain #3 angle", tagName: "140G_RC_01_ID_RakeChain3Angle", unit: "degree" },
                                                    { label: "Rake chain #4 angle", tagName: "140G_RC_01_ID_RakeChain4Angle", unit: "degree" },
                                                    { label: "Reclaimer state (0-10)", tagName: "140G_RC_01_ID_State"},
                                                    { label: "Travel position machine", tagName: "140G_RC_01_ID_TravelPosition", unit: "m" }, 
                                                ]}/>
                                            </GridItem>
                                            



                                        </VStack>
                                        
                                    </GridItem>


                                </Grid>
                                
                                



                                <Box>
                                </Box>


                            <Grid templateColumns="repeat(3, 1fr)" gap={6}> 
                                <GridItem colSpan={{ base: 20, xl: 1 }}>
                                        <HeatMapChart widgetName="140G conveyers Drive Status" 
                                        ColumnNumbers = {3}
                                        tiles={[
                                            { name: "RL1 conveyer", tagName: "RL1_OUT_Status" },
                                            { name: "RL2 conveyer", tagName: "RL2_OUT_Status" }, // As per spec
                                            { name: "RL3 conveyer", tagName: "RL3_OUT_Status" }, // As per spec
                                        ]} />
                                </GridItem>  

                                <GridItem colSpan={{ base: 20, xl: 2 }}>
                                    <HeatMapChart widgetName="Reclaimer 140G-RC-01 Status" 
                                    ColumnNumbers = {4}
                                    tiles={[
                                        { name: "Alarm misalignment Left", tagName: "140G_RC_01_ID_MisalignmentAlarm_Left" },
                                        { name: "Alarm misalignment Right", tagName: "140G_RC_01_ID_MisalignmentAlarm_Right" },
                                        { name: "Firealarm", tagName: "140G_RC_01_ID_FireAlarm" },
                                        { name: "Reclaimer in remote", tagName: "140G_RC_01_ID_InRemote" },
                                        { name: "Reclaimer ready", tagName: "140G_RC_01_ID_Ready" }, 
                                        { name: "Safety relais status OK", tagName: "140G_RC_01_ID_SafetyRelaisOk" },
                                        { name: "Warning misalignment right on Outload conveyer", tagName: "140G_RC_01_ID_MisalignmentWarning_Right" },
                                        { name: "Warning misalignment left on Outload conveyer", tagName: "140G_RC_01_ID_MisalignmentWarning_Left" },

                                    ]} />
                                </GridItem> 
                            </Grid>


                            <Grid templateColumns="repeat(4, 1fr)" gap={6}>  

                                <GridItem>
                                    <TrendSeries_MultiTag
                                        widgetName="Reclaimer Rakes Chain Angle"
                                        tagNames={["140G_RC_01_ID_RakeChain1Angle", "140G_RC_01_ID_RakeChain2Angle", "140G_RC_01_ID_RakeChain3Angle"]}
                                        trendNames={["Chain 1", "Chain 2", "Chain 3"]}
                                        timePeriodInHours={24}
                                    />
                                </GridItem> 
                                
                                <GridItem>
                                            <TrendSeries_MultiTag
                                                widgetName="150G-HP-01 Phosphate Hopper Levels"
                                                tagNames={["150G_HP_01_ID_LVLA", "150G_HP_01_ID_LVLB"]}
                                                trendNames={["Level A, %", "Level B, %"]}
                                                timePeriodInHours={24}
                                            />
                                </GridItem>

                                <GridItem>
                                    <TableWithTimeStamp
                                        widgetName="Phosphate Product Quality Laboratory Analysis"
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

                                <GridItem>
                                    <BarChart
                                        widgetName="Phosphate Product PSD Laboratory Analysis [%]"
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
 



                                
                                
                                

                            </VStack> 
                        </GridItem> 

                        <GridItem colSpan={{ base: 14, xl: 5 }}>
                            
                            <VStack h="100%" spacing={4} align="stretch"> 
                                
                                <GridItem>
                                    <Widget_SingleValue widgetName="Stacker 130G-ST-01 KPI" apiType="API_Actual" items={[
                                        { label: "Percent availability", tagName: "130G_ST_01_OUT_AvailablityPercentage", unit: "%" },
                                        { label: "Percent downtime", tagName: "130G_ST_01_OUT_DowntimePercentage", unit: "%" },
                                        { label: "Travel position", tagName: "130G_ST_01_ID_TravelPosition", unit: "%" },
                                    ]}/>
                                </GridItem>

                                <GridItem>
                                    <HeatMapChart widgetName="Stacker 130G-ST-01 Status" 
                                    ColumnNumbers = {3}
                                    tiles={[
                                        { name: "Emergency stop", tagName: "130G_ST_01_ID_EmergStop_CollapsTripper" },
                                        { name: "Firealarm", tagName: "130G_ST_01_ID_FireAlarm" },
                                        { name: "Alarm misalignment", tagName: "130G_ST_01_ID_MisalignmentAlarm" },
                                        { name: "Warning misalignment", tagName: "130G_ST_01_ID_MisalignmentWarning" },
                                        { name: "Hardwired interlock", tagName: "130G_ST_01_ID_HardInterlock_MVpanel" },
                                        { name: "Luffing position", tagName: "130G_ST_01_ID_BoomConv_LuffingPosition" },
                                        { name: "Safety relais OK", tagName: "130G_ST_01_ID_SafetyRelaisOk" },
                                        { name: "Bypass mode", tagName: "130G_ST_01_ID_InBypassMode" },
                                        { name: "Remote mode", tagName: "130G_ST_01_ID_InRemote" },
                                        { name: "Ready", tagName: "130G_ST_01_ID_Ready" },
                                        { name: "Run feedback", tagName: "130G_ST_01_ID_RunFeedback" },
                                        { name: "State", tagName: "130G_ST_01_ID_State" }, 
                                    ]} />
                                </GridItem>
                                
                                <GridItem>
                                    <HeatMapChart widgetName="130G-CV Conveyers Drive Status" 
                                    ColumnNumbers = {3}
                                    tiles={[
                                        { name: "130G-CV-01 (SL1)", tagName: "SL1_OUT_Status" },
                                        { name: "130G-CV-02 (SL2)", tagName: "SL2_OUT_Status" },
                                        { name: "130G-CV-03 (SL3)", tagName: "SL3_OUT_Status" },
                                        { name: "130G-CV-04 (SL4)", tagName: "SL4_OUT_Status" },
                                    ]} />
                                </GridItem>
                                
                                <GridItem>
                                    <HeatMapChart widgetName="150G conveyers Drive Status" 
                                    ColumnNumbers = {3}
                                    tiles={[
                                        { name: "150G-BF-01 (EL1)", tagName: "EL1_OUT_Status" },
                                        { name: "150G-BF-02 (EL2)", tagName: "EL2_OUT_Status" },
                                        { name: "150G-CV-06 (RL4)", tagName: "RL4_OUT_Status" },
                                        { name: "150G-CV-07 (RL5)", tagName: "RL5_OUT_Status" },
                                        { name: "150G-CV-08 (RL6)", tagName: "RL6_OUT_Status" },
                                    ]} />
                                </GridItem>
                                
                            </VStack>

                        </GridItem>



                    </Grid>

                </Box>


                



                




            </VStack>
        </VStack>
    );
};

export default PhosphateProductStoragePage;
