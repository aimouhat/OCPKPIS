import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Widget_SingleValue from "../components/widgets/Widget_SingleValue";
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag";
import HeatMapChart from "../components/widgets/HeatMapChart";

const TailingsHandlingPage = () => {
    return (
        <VStack spacing={6} align="stretch" p={6}>
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>Tailings Handling and Storage</Heading>
            </Box>

            <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                


                <GridItem>
                    <HeatMapChart ColumnNumbers={1}
                        widgetName="410A-VP-01 Sumpf Pump Drive Status"
                        tiles={[
                            { name: "410A-VP-01 Sumpf Pump", tagName: "410G_TK_02_OUT_Sumpf_Pump1_Status" },
                        ]}
                    />
                </GridItem>

                <GridItem colSpan={{ base: 12, lg: 2 }}>
                    <HeatMapChart ColumnNumbers={2}
                        widgetName="410G-TK-02 Tailing Transfer Tank Drive Status"
                        tiles={[
                            { name: "410A-SP-02D Pump", tagName: "410G_TK_02_OUT_Pump1_Status" },
                            { name: "410A-SP-02S Pump", tagName: "410G_TK_02_OUT_Pump4_Status" },
                        ]}
                    />
                </GridItem>

                <GridItem colSpan={{ base: 12, lg: 2 }}>
                    <HeatMapChart ColumnNumbers={2}
                        widgetName="440G-BS-01 TSF Reclaim Water Basin Drive Status"
                        tiles={[
                            { name: "440G-WP-01D Pump", tagName: "440G_BS_01_OUT_PumpD_Status" },
                            { name: "440G-WP-01S Pump", tagName: "440G_BS_01_OUT_PumpS_Status" },
                        ]}
                    />
                </GridItem>
                
                <GridItem colSpan={{ base: 12, lg: 2 }}>
                    <Widget_SingleValue
                        widgetName="410G-TK-02 Tailing Pump and Storage Input"
                        apiType="API_Actual"
                        items={[
                            { label: "Solid Concentration", tagName: "410G_TK_02_ID_In1_SolidConcentration", unit: "%" },
                            { label: "Volumetric Flow Rate", tagName: "410G_TK_02_ID_In1_Q", unit: "m3/h" },
                        ]}
                    />
                </GridItem>

                <GridItem colSpan={{ base: 12, lg: 2 }}>
                    <Widget_SingleValue
                        widgetName="440G-BS-01 Tailing Pump and Storage Output"
                        apiType="API_Actual"
                        items={[
                            { label: "Solid Concentration", tagName: "440G_BS_01_ID_Out_SolidConcentration", unit: "%" },
                            { label: "Volumetric Flow Rate", tagName: "400A_TH_01_ID_OutHeavy_Q", unit: "m3/h" },
                        ]}
                    />
                </GridItem>
            </Grid>

            <Grid templateColumns="repeat(12, 1fr)" gap={6}>

                <GridItem colSpan={{ base: 12, lg: 3 }}>
                    <TrendSeries_MultiTag
                        widgetName="410G-TK-02 Tailing Transfer Tank"
                        tagNames={["410G_TK_02_ID_LVLA", "410G_TK_02_ID_LVLB"]}
                        trendNames={["Tank Level A, %", "Tank Level B, %"]}
                        timePeriodInHours={24}
                    />
                </GridItem>

                <GridItem colSpan={{ base: 12, lg: 3 }}>
                    <TrendSeries_MultiTag
                        widgetName="440G-BS-01 TSF Reclaim Water Basin"
                        tagNames={["440G_BS_01_ID_LVLA", "440G_BS_01_ID_LVLB"]}
                        trendNames={["Basin Level A, %", "Basin Level B, %"]}
                        timePeriodInHours={24}
                    />
                </GridItem>

                <GridItem colSpan={{ base: 12, md: 6, lg: 3 }}>
                    <TrendSeries_MultiTag
                        widgetName="410A-VP-01 Sumpf Level"
                        tagNames={["410G_TK_02_ID_Sumpf_LVL1"]}
                        trendNames={["Sumpf Level, %"]}
                        timePeriodInHours={24}
                    />
                </GridItem>

            </Grid>
        </VStack>
    );
};

export default TailingsHandlingPage;
