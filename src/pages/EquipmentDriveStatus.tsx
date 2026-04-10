import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag";
import SemiCircleGaugeWidget from "../components/widgets/SemiCircleGaugeWidget";
import HeatMapChart from "../components/widgets/HeatMapChart";

const ApcPerformancePage = () => {
    return (
        <VStack spacing={6} align="stretch" p={6}>
            <Box display="flex" alignItems="center">
                <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                    Back to Portal
                </Button>
                <Heading ml={6}>Equipment Drive Status</Heading>
            </Box> 

            <VStack spacing={6} align="stretch" p={6}>  
                <Box width={2000}>              
                    <HeatMapChart
                        widgetName="Conveyers statuses"
                        ColumnNumbers = {5}
                        tiles={[
                            { name: "Scrubbing and Screening Area	EX1(210A-BF-01)", tagName: "EX1_OUT_Status" },
                            { name: "Scrubbing and Screening Area	CAD1(210A-CV-01)", tagName: "CAD1_OUT_Status" },
                            { name: "Product Filtration Area	CS1(240G-CV-01)", tagName: "CS1_OUT_Status" },
                            { name: "Product Filtration Area	CS2(240G-CV-02)", tagName: "CS2_OUT_Status" },
                            { name: "Product Filtration Area	CS3(240G-CV-03)", tagName: "CS3_OUT_Status" },
                            { name: "Product Filtration Area	CS4(240G-CV-04)", tagName: "CS4_OUT_Status" },
                            { name: "Product Filtration Area	SL1(130G-CV-01)", tagName: "SL1_OUT_Status" },
                            { name: "Product Filtration Area	SL2(130G-CV-02)", tagName: "SL2_OUT_Status" },
                            { name: "Product Filtration Area	SL3(130G-CV-03)", tagName: "SL3_OUT_Status" },
                            { name: "SL4(130G-TC-01)", tagName: "SL4_OUT_Status" },
                            { name: "RL2(140CV02)", tagName: "RL2_OUT_Status" },
                            { name: "RL3(140CV03)", tagName: "RL3_OUT_Status" },
                            { name: "Phosphate Product Delivery	EL1(150G-BF-01)", tagName: "EL1_OUT_Status" },
                            { name: "Phosphate Product Delivery	EL2(150G-BF-02)", tagName: "EL2_OUT_Status" },
                            { name: "RL4(150CV06)", tagName: "RL4_OUT_Status" },
                            { name: "RL5(150CV07)", tagName: "RL5_OUT_Status" },
                            { name: "RL6(150CV09)", tagName: "RL6_OUT_Status" },
                            { name: "Coarse Reject Handling Area	CT1(160G-CV-01D)", tagName: "CT1_D_OUT_Status" },
                            { name: "Coarse Reject Handling Area	CT2(160G-CV-02D)", tagName: "CT2_OUT_Status" },
                            { name: "Coarse Reject Handling Area	T1(160G-CV-03D)", tagName: "T1_D_OUT_Status" },
                            { name: "Coarse Reject Handling Area	CT1'(CT1 bis)", tagName: "CT1_S_OUT_Status" },
                            { name: "Coarse Reject Handling Area	CT2'(CT2 bis)", tagName: "CT2_S_OUT_Status" },
                            { name: "Coarse Reject Handling Area	T1'(T1 bis)", tagName: "T1_S_OUT_Status" },
                            { name: "Phosphate Ore Storage  Area	CB5", tagName: "CB5_OUT_Status" },
                            { name: "Phosphate Ore Storage  Area	CB1", tagName: "CB1_OUT_Status" },
                            { name: "Phosphate Ore Storage  Area	CB2", tagName: "CB2_OUT_Status" },
                            { name: "Phosphate Ore Storage  Area	CB3", tagName: "CB3_OUT_Status" },
                            { name: "Phosphate Ore Storage  Area	SB1", tagName: "SB1_OUT_Status" },
                            { name: "120G-CV-01(RB1)", tagName: "RB1_OUT_Status" },
                            { name: "120G-CV-02(RB2)", tagName: "RB2_OUT_Status" },
                            { name: "120G-CV-03(RB2’)", tagName: "RB3_OUT_Status" },
                        ]}
                    />  
                </Box> 
                
                </VStack>  
        </VStack>
    );
};

export default ApcPerformancePage;
