import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag";
import HeatMapChart from "../components/widgets/HeatMapChart";
import Widget_SingleValue from "../components/widgets/Widget_SingleValue";
import TableWithTimeStamp from "../components/widgets/TableWithTimeStamp"; // Import the new widget
import BarChart from "../components/widgets/BarChart";

const ClassificationAreaPage = () => { 
    return (
        // Added new
        <Box p={6}> 
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>220-Classification</Heading>
            </Box>

            {/* The VStack creates the main vertical separation between the upper and bottom parts. */} 
            <VStack spacing={6} align="stretch" p={6}>

                {/* --- UPPER PART (4 Columns) --- */} 
                <Box> 
                    <Grid
                        templateColumns="repeat(4, 1fr)" // Creates 4 equal-width columns
                        gap={6}
                    >
                        <GridItem>
                            <Widget_SingleValue
                                widgetName="220A-CY-01 Primary Wash Cyclone KPIs"
                                apiType="API_Actual"
                                items={[
                                    { label: "Cyclone Cluster Operating Pressure", tagName: "220A_CY_01_ID_In_P", unit: "bar" },
                                    { label: "Cyclone Feed Density (solids)", tagName: "220A_CY_01_ID_In_SolidConcentration", unit: "kg/m3" },
                                    { label: "Primary Wash Cyclone Overflow (>125μm D50)", tagName: "Classification_Area_ID_Out_M_PW_Light125", unit: "%" },
                                    { label: "Primary Wash Cyclone Underflow (<125μm D50)", tagName: "Classification_Area_ID_Out_M_PW_Heavy125", unit: "%" },
                                ]}
                            />
                            
                            
                        </GridItem> 
                        
                        <GridItem> 
                            <VStack h="100%" spacing={4} align="stretch">
                                <Widget_SingleValue
                                    widgetName="Classification Area KPI"
                                    apiType="API_Actual"
                                    items={[
                                        { label: "Classification Mass Yield", tagName: "Classification_Area_OUT_ClassificationMassYield", unit: "%" },
                                        { label: "Specific Energy Consumption", tagName: "Classification_Area_OUT_SpecificEnergyConsumption", unit: "kWt/t" },

                                    ]}
                                /> 

                                <Widget_SingleValue
                                    widgetName="220A-HS Hydrosizer KPI"
                                    apiType="API_Actual"
                                    items={[
                                        { label: "Hydrosizer Cut Size (D50)", tagName: "Classification_Area_ID_Out_M_HS_Heavy50", unit: "%" },
                                        { label: "Hydrosizer Overflow (Coarse Solids)", tagName: "Classification_Area_ID_Out_M_HS_Light_160_200", unit: "%" },
                                    ]}
                                /> 
                            </VStack>
                        </GridItem>
                        
                        <GridItem> 
                            <Widget_SingleValue
                                widgetName="230A-CY-01 Wash Product Dewatering Cyclone"
                                apiType="API_Actual"
                                items={[
                                    { label: "Wash Product Cyclone Overflow % D50", tagName: "Classification_Area_ID_Out_M_WPD_Light_Solids", unit: "%" },
                                    { label: "Wash Product Cyclone Underflow", tagName: "Classification_Area_ID_Out_M_WPD_Heavy_Solids", unit: "%" },
                                    { label: "Cyclone Cluster Operating Pressure", tagName: "230A_CY_01_ID_In_P", unit: "bar" },
                                    { label: "Cyclone Dry Feed Mass Rate", tagName: "230A_CY_01_OUT_Out_W", unit: "t/h" },
                                    { label: "Cyclone Feed Density (solids)", tagName: "230A_CY_01_ID_In_SolidConcentration", unit: "kg/m3" },
                                    { label: "Cyclone Underflow (160-200μm)", tagName: "Classification_Area_ID_Out_M_WPD_Heavy_160_200", unit: "%" },
                                ]}
                            /> 
                        </GridItem>

                        <GridItem>
                            <Widget_SingleValue
                                widgetName="230A-CY-02 Primary Deslime Cyclone Cluster"
                                apiType="API_Actual"
                                items={[
                                    { label: "Cyclone Cluster Operating Pressure", tagName: "230A_CY_02_ID_In_P", unit: "bar" },
                                    { label: "Cyclone Dry Feed Mass Rate", tagName: "230A_CY_02_OUT_In_Dry_W", unit: "t/h" },
                                    { label: "Cyclone Feed Density (solids)", tagName: "230A_CY_02_ID_In_SolidConcentration", unit: "kg/m3" },
                                    { label: "Primary Deslime Cyclone Overflow % +40um D50", tagName: "Classification_Area_ID_Out_M_PD_Light40", unit: "%" },
                                    { label: "Primary Deslime Cyclone Underflow % -40mu D50", tagName: "Classification_Area_ID_Out_M_PD_Heavy40", unit: "%" },
                                ]}
                            />
                        </GridItem> 
                    </Grid>
                </Box> 

                
                {/* --- MIDDLE PART (6 Columns) --- */} 
                <Box> 
                    <Grid
                        templateColumns="repeat(6, 1fr)" // Creates 6 equal-width columns
                        gap={6}
                    >
                        <GridItem>
                            <HeatMapChart
                                widgetName="220A-PB-01 Primary Wash Cyclone Feed Pump Box"
                                ColumnNumbers = {2}
                                tiles={[
                                    { name: "220A-SP-01D", tagName: "220A_PB_01_OUT_PumpD_Status" },
                                    { name: "220A-SP-01S", tagName: "220A_PB_01_OUT_PumpS_Status" },
                                ]}
                            />
                        </GridItem> 
                        
                        
                        <GridItem>
                            <HeatMapChart
                                widgetName="220A-PB-02 Hydrosizer Feed Pump Box"
                                ColumnNumbers = {2}
                                tiles={[
                                    { name: "220A-SP-02D", tagName: "220A_PB_02_OUT_PumpD_Status" },
                                    { name: "220A-SP-02S", tagName: "220A_PB_02_OUT_PumpS_Status" },
                                    { name: "220A-AG-02", tagName: "220A_PB_02_OUT_Agitator_Status" },
                                ]}
                            />
                        </GridItem>

                        <GridItem>
                            <HeatMapChart
                                widgetName="230A-PB-01 Wash Product Dewatering Cyclone"
                                ColumnNumbers = {2}
                                tiles={[
                                    { name: "230A-SP-01D", tagName: "230A_PB_01_OUT_PumpD_Status" },
                                    { name: "230A-SP-01S", tagName: "230A_PB_01_OUT_PumpS_Status" },
                                ]}
                            />
                        </GridItem>

                        <GridItem>
                            <HeatMapChart
                                widgetName="230A-PB-02 Primary Deslime Cyclone Feed Pump Box"
                                ColumnNumbers = {2}
                                tiles={[
                                    { name: "230A-SP-02D", tagName: "230A_PB_02_OUT_PumpD_Status" },
                                    { name: "230A-SP-02S", tagName: "230A_PB_02_OUT_PumpS_Status" },
                                ]}
                            />
                        </GridItem>

                        <GridItem>
                            <HeatMapChart
                                widgetName="220A-TK-01 Process Water Feed Tank"
                                ColumnNumbers = {2}
                                tiles={[
                                    { name: "220A-WP-01D", tagName: "220A_TK_01_OUT_PumpD_Status" },
                                    { name: "220A-WP-01S", tagName: "220A_TK_01_OUT_PumpS_Status" },
                                    { name: "220A-WP-02", tagName: "220A_TK_01_OUT_Pump1_Status" },
                                ]}
                            />
                        </GridItem>

                        <GridItem>
                            <HeatMapChart
                                widgetName="230A-PB-04 Flotation Plant Feed Pump Box"
                                ColumnNumbers = {2}
                                tiles={[
                                    { name: "230A-SP-04D", tagName: "230A_PB_04_OUT_PumpD_Status" },
                                    { name: "230A-SP-04S", tagName: "230A_PB_04_OUT_PumpS_Status" },
                                ]}
                            />
                        </GridItem>
                    </Grid>
                </Box>


                <Box>
                    <Grid
                        templateColumns="repeat(4, 1fr)" // Creates 4 equal-width columns
                        gap={6}
                    >
                    <GridItem colSpan={{ base: 12, md: 1 }}>
                         <VStack h="100%" spacing={4} align="stretch">
                         <TableWithTimeStamp
                            widgetName="Non Flotation Product Quality Laboratory Analysis"
                            items={[
                                { label: "BPL", tagName: "Classification_Area_ID_M_NonFloatProd_Conce_BPL", unit: "%" },
                                { label: "CO2", tagName: "Classification_Area_ID_M_NonFloatProd_Conce_CO2", unit: "%" },
                                { label: "SiO2", tagName: "Classification_Area_ID_M_NonFloatProd_Conce_SiO2", unit: "%" },
                                { label: "MgO", tagName: "Classification_Area_ID_M_NonFloatProd_Conce_MgO", unit: "%" },
                                { label: "Cd", tagName: "Classification_Area_ID_M_NonFloatProd_Conce_Cd", unit: "ppm" },
                                { label: "CaO", tagName: "Classification_Area_ID_M_NonFloatProd_Conce_CaO", unit: "%" },
                            
                            ]}
                        />
                        </VStack>
                    </GridItem>

                    <GridItem>
                        <BarChart
                            widgetName="Non Flotation Product PSD Laboratory Analysis [%]"
                            apiType="API_Actual"
                
                            items={[
                                { label: "Less 40 µm", tagName: "Classification_Area_ID_M_NonFloatProd_less40" },
                                { label: "40 µm", tagName: "Classification_Area_ID_M_NonFloatProd_40" },
                                { label: "160 µm", tagName: "Classification_Area_ID_M_NonFloatProd_160" },
                                { label: "200 µm", tagName: "Classification_Area_ID_M_NonFloatProd_200" },
                                { label: "3150 µm", tagName: "Classification_Area_ID_M_NonFloatProd_3150" },
                            ]}
                        />
                        
                    </GridItem>

                    <GridItem colSpan={{ base: 12, md: 1 }}>
                         <VStack h="100%" spacing={4} align="stretch">
                         <TableWithTimeStamp
                            widgetName="Washing Product Quality Laboratory Analysis"
                            items={[
                                { label: "BPL,%", tagName: "Classification_Area_ID_M_WashedProd_Conce_BPL" },
                                { label: "CO2,%", tagName: "Classification_Area_ID_M_WashedProd_Conce_CO2" },
                                { label: "SiO2, %", tagName: "Classification_Area_ID_M_WashedProd_Conce_SiO2" },
                                { label: "MgO, %", tagName: "Classification_Area_ID_M_WashedProd_Conce_MgO" },
                                { label: "Cd, ppm", tagName: "Classification_Area_ID_M_WashedProd_Conce_Cd" },
                                { label: "CaO, %", tagName: "Classification_Area_ID_M_WashedProd_Conce_CaO" },
                            ]}
                        />
                        </VStack>
                    </GridItem>

                    <GridItem>
                        <BarChart
                            widgetName="Washing Product PSD Laboratory Analysis [%]"
                            apiType="API_Actual"
                    
                            items={[
                                { label: "Less 40 µm", tagName: "Classification_Area_ID_M_WashedProd_less40" },
                                { label: "40 µm", tagName: "Classification_Area_ID_M_WashedProd_40" },
                                { label: "160 µm", tagName: "Classification_Area_ID_M_WashedProd_160" },
                                { label: "200 µm", tagName: "Classification_Area_ID_M_WashedProd_200" },
                                { label: "3150 µm", tagName: "Classification_Area_ID_M_WashedProd_3150" },
                            ]}
                        />
                    
                    </GridItem>

                    </Grid>

                </Box>

                {/* --- DOWN PART (4 Columns) --- */}  
                <Box> 
                    <Grid
                        templateColumns="repeat(3, 1fr)" // Creates 4 equal-width columns
                        gap={6}
                    >
                        <GridItem> 
                            <VStack h="100%" spacing={4} align="stretch">
                                <TrendSeries_MultiTag
                                    widgetName="220A-PB-01 Primary Wash Cyclone Feed Pump Box Level A, % "
                                    tagNames={[ "220A_PB_01_ID_LVLA"]}
                                    trendNames={["Pump Box Level A"]}
                                    timePeriodInHours={480}
                                /> 

                                <TrendSeries_MultiTag
                                    widgetName="220A-PB-02 Hydrosizer Feed Pump Box Level A, %"
                                    tagNames={["220A_PB_02_ID_LVLA"]}
                                    trendNames={["Pump Box Level A"]}
                                    timePeriodInHours={480}
                                />
                            </VStack>
                        </GridItem>

                        <GridItem>
                            <VStack h="100%" spacing={4} align="stretch"> 
                                <TrendSeries_MultiTag
                                    widgetName="230A-PB-01 Wash Product Dewatering Cyclone Feed Pump Box Level A, %"
                                    tagNames={["230A_PB_01_ID_LVLA"]}
                                    trendNames={["Pump Box Level A"]}
                                    timePeriodInHours={480}
                                />

                                <TrendSeries_MultiTag
                                    widgetName="230A-PB-02 Primary Deslime Cyclone Feed Pump Box Level A, % "
                                    tagNames={["230A_PB_02_ID_LVLA"]}
                                    trendNames={["Pump Box Level A"]}
                                    timePeriodInHours={480}
                                />
                            </VStack>
                        </GridItem>

                        <GridItem>
                            <VStack h="100%" spacing={4} align="stretch"> 
                                <TrendSeries_MultiTag
                                    widgetName="230A-PB-04 Flotation Plant Feed Pump Box Level A, %"
                                    tagNames={["230A_PB_04_ID_LVLA"]}
                                    trendNames={["Pump Box Level A"]}
                                    timePeriodInHours={480}
                                />

                                <TrendSeries_MultiTag
                                    widgetName="220A-TK-01  Process Water Feed Tank Level A, % "
                                    tagNames={["220A_TK_01_ID_LVLA"]}
                                    trendNames={["Tank Level A"]}
                                    timePeriodInHours={480}
                                />
                            </VStack>
                        </GridItem>

                     
                    </Grid>
                </Box>


            </VStack>
        </Box>
    );

};

export default ClassificationAreaPage;
