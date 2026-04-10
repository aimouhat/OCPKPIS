import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag";
import HeatMapChart from "../components/widgets/HeatMapChart";
import Widget_SingleValue from "../components/widgets/Widget_SingleValue";
import TableWithTimeStamp from "../components/widgets/TableWithTimeStamp"; // Import the new widget
import BarChart from "../components/widgets/BarChart";
const TailingThickenerPage = () => {
    return (
        <Box p={6}>
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>410-Thickening &  420-Flocculent preparation</Heading>
            </Box>

            <VStack spacing={6} align="stretch" p={6}>
                {/* --- UPPER PART (4 Columns) --- */} 
                <Box>
                    <Grid
                        templateColumns="repeat(3, 1fr)" // Creates 4 equal-width columns
                        gap={6}
                    >
                        <GridItem>
                            <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>
                                <Heading size="md" mb={4} textAlign="center" >Thickener</Heading>
                                    <Grid
                                        templateColumns="repeat(2, 1fr)" // Creates 4 equal-width columns
                                        gap={6}
                                    >   
                                        <GridItem>
                                            <VStack h="100%" spacing={4} align="stretch">
                                                <Widget_SingleValue widgetName="Thickener KPIs" apiType="API_Actual" items={[
                                                    { label: "Mud Level", tagName: "400A_TH_01_OD_Mud_LVL", unit: "m" },
                                                    { label: "Rake Power Frequency", tagName: "400A_TH_01_OUT_Frequency" },
                                                    { label: "Underflow Density, mass", tagName: "400A_TH_01_ID_OutHeavy_SolidConcentration", unit: "t/m3" },
                                                    { label: "Overflow Clarity", tagName: "Tailings_Thickener_&_Flocculant_Preparation_ID_M_Out_Light_Clarity", unit: "g/l" },
                                                    { label: "Flocculant Specific Consumption", tagName: "PlantA_OUT_SpecificFlocullantConsumption_OnlineTOTAL", unit: "g/t" },
                                                ]} />
                                                <Widget_SingleValue widgetName="Thickener Rake Torque,%" apiType="API_Actual" items={[
                                                    { label: "Rake Torque 1", tagName: "400A_TH_01_ID_GB1_Torque" },
                                                    { label: "Rake Torque 2", tagName: "400A_TH_01_ID_GB2_Torque" },
                                                    { label: "Rake Torque 3", tagName: "400A_TH_01_ID_GB3_Torque" },
                                                ]} /> 
                                            </VStack> 
                                        </GridItem>

                                        <GridItem>
                                            <VStack h="100%" spacing={4} align="stretch">
                                                <HeatMapChart widgetName="Thickener Drive Motor Status" ColumnNumbers={1} tiles={[{ name: "400A-TH-01", tagName: "400A_TH_01_OUT_Status" }]} />

                                                <HeatMapChart widgetName="Forced Dilution Mixer Drive Motor Status" ColumnNumbers={1} tiles={[
                                                    { name: "400A-TH-01", tagName: "400A_TH_01_OUT_Agitator_Status" },
                                            
                                                ]} />

                                                <HeatMapChart widgetName="Thickener Underflow Pump Drive status" ColumnNumbers={2} tiles={[
                                                    { name: "410A-SP-01D", tagName: "400A_TH_01_OUT_PumpD_Status" },
                                                    { name: "410A-SP-01S", tagName: "400A_TH_01_OUT_PumpS_Status" },
                                                ]} />  
                                            </VStack>

                                        </GridItem>

                                    </Grid>
                            </Box> 
                        </GridItem>

                        <GridItem> 
                                <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }} mb={2}>
                                    <Heading size="md" mb={4} textAlign="center" >Tailing Thickener Area</Heading>
                                    <Grid
                                                templateColumns="repeat(2, 1fr)" // Creates 4 equal-width columns
                                                gap={6}
                                            >
                                                <Widget_SingleValue widgetName="Specific Energy Consumption" 
                                                    apiType="API_Aggregated" 
                                                    timePeriodInHours={24} 
                                                    items={[{ label: "Thickener:", 
                                                        tagName: "Tailing_Thickener_Area_OUT_SpecificEnergyConsumption", unit: "kWt/t" }]} />
                                                <Widget_SingleValue widgetName="Flocculant Specific Consumption" apiType="API_Aggregated" 
                                                timePeriodInHours={24} items={[{ label: "Flocculant Specific Consumption", tagName: "PlantA_OUT_SpecificFlocullantConsumption_OnlineTOTAL", unit: "g/t" }]} />

                                            </Grid> 
                                </Box>
                                
                                <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }} mb={2}>
                                    <Heading size="md" mb={4} textAlign="center" >Tailing Water</Heading>
                                        <Grid
                                                templateColumns="repeat(2, 1fr)" // Creates 4 equal-width columns
                                                gap={6}
                                            >
                                                <GridItem>
                                                    <HeatMapChart widgetName="Tailing Water Pumping Station Drives Status" 
                                                    ColumnNumbers = {2}
                                                    tiles={[
                                                        { name: "410A-SP-02D", tagName: "410G_TK_02_OUT_Pump1_Status" },
                                                        { name: "410A-SP-02S", tagName: "410G_TK_02_OUT_Pump2_Status" },
                                                        { name: "410A-SP-03D", tagName: "410G_TK_02_OUT_Pump3_Status" },
                                                        { name: "410A-SP-03S", tagName: "410G_TK_02_OUT_Pump4_Status" },
                                                        { name: "410A-SP-04D", tagName: "410G_TK_02_OUT_Pump5_Status" },
                                                        { name: "410A-SP-04S", tagName: "410G_TK_02_OUT_Pump6_Status" },
                                                        { name: "410GU15010 Agitator", tagName: "410G_TK_02_OUT_Agitator_Status" },
                                                    ]} />
                                                </GridItem>

                                                <GridItem>
                                                    <TrendSeries_MultiTag widgetName="410G-TK-02 Tailing Water Tank Levels, %" 
                                                    tagNames={["410G_TK_02_ID_LVLA", "410G_TK_02_ID_LVLB"]} 
                                                    trendNames={["Level A", "Level B"]} 
                                                    timePeriodInHours={12} />
                                                </GridItem> 
                                        </Grid> 
                                </Box>
                            
                            <Box>
                                <Grid
                                    templateColumns="repeat(2, 1fr)" // Creates 4 equal-width columns
                                    gap={6}
                                >
                                    <GridItem>
                                        <HeatMapChart widgetName="420A-TK-01 Flocculant Mixing Tank" ColumnNumbers={1} tiles={[
                                            { name: "D420AAAG01 Agitator", tagName: "420A_TK_01_OUT_Agitator_Status" }, 
                                        ]} />
                                    </GridItem>

                                    <GridItem>
                                        <HeatMapChart widgetName="420A-TK-01 Flocculant Mixing Tank" ColumnNumbers={1} tiles={[
                                            { name: "420A-SC-01 Screw Conveyer Motor Status", tagName: "420A_SC_01_OUT_Status" }, 
                                        ]} />
                                    </GridItem>


                                </Grid>


                            </Box>
                            
                        </GridItem>


                        <GridItem>
                            <Box style={{ border: '1px solid #3a3a3aff', borderRadius: '5px' }}>
                                <Heading size="md" mb={4} textAlign="center" >Flocculant Tanks</Heading>
                                    <Grid
                                            templateColumns="repeat(2, 1fr)" // Creates 4 equal-width columns
                                            gap={6}
                                        >
                                            <GridItem>
                                                <VStack h="100%" spacing={4} align="stretch">
                                                    <HeatMapChart widgetName="420A-TK-01 Flocculant Mixing Tank Drives Status" ColumnNumbers={3} tiles={[
                                                        { name: "420A-AG-01", tagName: "420A_TK_01_OUT_Agitator_Status" },
                                                        { name: "420A-SP-01D", tagName: "420A_TK_01_OUT_PumpD_Status" },
                                                        { name: "420A-SP-01S", tagName: "420A_TK_01_OUT_PumpS_Status" },
                                                    ]} />
                                                    <HeatMapChart widgetName="420A-TK-02 Flocculant Dosing Tank Drives Status" ColumnNumbers={2} tiles={[
                                                        { name: "420A-SP-02D", tagName: "420A_TK_02_OUT_PumpD_Status" },
                                                        { name: "420A-SP-02S", tagName: "420A_TK_02_OUT_PumpS_Status" },
                                                    ]} />

                                                </VStack>  
                                            </GridItem>

                                            <GridItem>
                                                <VStack h="100%" spacing={4} align="stretch"> 
                                                    <TrendSeries_MultiTag widgetName="420A-TK-01 Flocculant Mixing Tank Lev,%" tagNames={["420A_TK_01_ID_LVLA", "420A_TK_01_ID_LVLB"]} trendNames={["Level A", "Level B"]} timePeriodInHours={12} />
                                                    <TrendSeries_MultiTag widgetName="420A-TK-02 Flocculant Dosing Tank Lev,%" tagNames={["420A_TK_02_ID_LVLA", "420A_TK_02_ID_LVLB"]} trendNames={["Level A", "Level B"]} timePeriodInHours={12} />

                                                </VStack>
                                            </GridItem>
                                            
                                        </Grid>
                                        
                            </Box>
                            
                        </GridItem>
                        
                    </Grid>
                </Box> 

                {/* --- BOTTOM PART (3 Columns) --- */}  
                <Box>
                    <Grid
                            templateColumns="repeat(5, 1fr)" // Creates 4 equal-width columns
                            gap={6}
                        >
                            <GridItem>
                                <HeatMapChart widgetName="Sumpf Drives Status" ColumnNumbers={2}
                                tiles={[
                                    { name: "410G-VP-03D", tagName: "410A_DB_01_OUT_Sumpf_Pump2_Status" },
                                    { name: "410G-VP-03S", tagName: "410A_DB_01_OUT_Sumpf_Pump3_Status" },
                                    { name: "410G-VP-01", tagName: "410A_DB_01_OUT_Sumpf_Pump1_Status" },
                                    
                                    { name: "420A-VP-01", tagName: "420A_VP_01_OUT_Sumpf_Pump1_Status" },
                                    { name: "410A-VP-01", tagName: "410G_TK_02_OUT_Sumpf_Pump1_Status" },

                                ]} />
                            </GridItem>
                            
                            <GridItem colSpan={{ base: 12, md: 1 }}>
                                <VStack h="100%" spacing={4} align="stretch">
                                <TableWithTimeStamp
                                    widgetName="Thickener Input Quality Laboratory Analysis, %"
                                    items={[
                                        { label: "BPL", tagName: "Tailings_Thickener_&_Flocculant_Preparation_ID_M_Decanter_Conce_BPL", unit: "%" },
                                        { label: "Cd", tagName: "Tailings_Thickener_&_Flocculant_Preparation_ID_M_Decanter_Conce_Cd", unit: "ppm" },
                                    
                                    ]}
                                />
                                </VStack>
                            </GridItem>

                            <GridItem>
                                <BarChart
                                    widgetName="Thickener Input PSD Laboratory Analysis [%]"
                                    apiType="API_Actual"
                                
                                        items={[
                                            { label: "Less 40 µm", tagName: "Tailings_Thickener_&_Flocculant_Preparation_ID_M_In_PSDLess40" },
                                            { label: "40 µm", tagName: "Tailings_Thickener_&_Flocculant_Preparation_ID_M_In_PSD40" },
                                            { label: "160 µm", tagName: "Tailings_Thickener_&_Flocculant_Preparation_ID_M_In_PSD160" },
                                            { label: "200 µm", tagName: "Tailings_Thickener_&_Flocculant_Preparation_ID_M_In_PSD200" },
                                            { label: "3150 µm", tagName: "Tailings_Thickener_&_Flocculant_Preparation_ID_M_In_PSD3150" },
                                        ]}
                                    />
                                
                            </GridItem>

                            <GridItem>
                                <TrendSeries_MultiTag widgetName="410G-VP-01 Sump Level A, %" 
                                    tagNames={["410A_DB_01_ID_Sumpf_LVL1"]} 
                                    trendNames={["Level A"]} 
                                    timePeriodInHours={12} />
                            </GridItem>

                            <GridItem>
                                <TrendSeries_MultiTag widgetName="410A-VP-01 Sump Level A, %" 
                                    tagNames={["410G_TK_02_ID_Sumpf_LVL1"]} 
                                    trendNames={["Level A"]} timePeriodInHours={12} />
                            </GridItem>

                            <GridItem>
                                <TrendSeries_MultiTag widgetName="420A-VP-01 Sump Level A, %" 
                                    tagNames={["400A_TH_01_ID_Sumpf_LVL1"]} 
                                    trendNames={["Level A"]} timePeriodInHours={12} />
                            </GridItem>

                            <GridItem>
                                <TrendSeries_MultiTag widgetName="410A-VP-03 Sump Level A, %" 
                                    tagNames={["410A_DB_01_ID_Sumpf_LVL2"]} 
                                    trendNames={["Level A"]} timePeriodInHours={12} />
                            </GridItem>

                    </Grid>


                </Box>


            </VStack>
        </Box>

    );
};

export default TailingThickenerPage;
