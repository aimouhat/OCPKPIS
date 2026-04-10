import { SimpleGrid, Box, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const allDashboardLabels = [
    "Global Plant KPI", 
    "110-Phosphate Ore Storage and 120-Reclaiming Area",
    "210-Scrubbing and Screening Area", 
    "160-Coarse Reject Area", "220-Classification",
    "310-Attrition Area", 
    "320-Flotation", 
    "410-Thickening & 420-Flocculent preparation", 
    "240-Product Filtration Area",
    "130-Phosphate Product Storage and 140-Reclaiming Area", 
    "330-Flotation Reagent Preparation",
    "Tailings Handling and Storage", 
    "510-Water and Utilities", 
    "APC Performance Assessment KPI",
    "PROCESS LINE", "KEY EQUIPMENT", 
    "Downtime KPI", 
    "Downtime Trends KPI", 
    "Production",
    "Production - Quality, Operational", 
    "Production -Feeds, Costs", 
    "Maintenance",
    "Maintenance - Operational", 
    "Maintenance - Alarms", 
    "Engineering",
    "Engineering - Rates, Costs, APC", 
    "Engineering - Alarms", 
    "Engineering Equipment Performance",
    "Operator Dashboard",
    "Operator in Detail",
    "Operator Equipment Performance", 
    "Management",
    "Management in Detail", 
    "Equipment Drive Status", 
    "Producing Accounting Daily Report",
];

// THE FIX: Add the new dashboard to the active list
const activeDashboards: { [key: string]: string } = {
    "Operator Dashboard": "/operator-dashboard",
    "Operator in Detail": "/operator-in-detail",
    "220-Classification": "/classification-area",
    "320-Flotation": "/flotation-area",
    "410-Thickening & 420-Flocculent preparation": "/tailing-thickener",
    "310-Attrition Area": "/attrition-area",
    "210-Scrubbing and Screening Area": "/scrubbing-and-screening",
    "110-Phosphate Ore Storage and 120-Reclaiming Area": "/phosphate-ore-storage", // THE FIX
    "130-Phosphate Product Storage and 140-Reclaiming Area": "/phosphate-product-storage", // THE FIX
    "510-Water and Utilities": "/water-and-utilities", // THE FIX
    "160-Coarse Reject Area": "/coarse-reject-area",
    "240-Product Filtration Area": "/product-filtration-area",
    "APC Performance Assessment KPI": "/apc-performance",
    "Global Plant KPI": "/global-plant-kpi",
    "330-Flotation Reagent Preparation": "/flotation-reagent-preparation",
    "KEY EQUIPMENT": "/dt-key-equipment", // Activate the Maintenance link
    "PROCESS LINE": "/dt-lines", // Activate the Maintenance link
    
    "Downtime KPI": "/downtime-kpi", // Activate the new link 
	"Management": "/management", // Activate the Maintenance link
    "Tailings Handling and Storage": "/tailings-handling-and-storage",
    "Production - Quality, Operational": "/production-quality-operational",
    "Production -Feeds, Costs": "/production-feeds-costs", 

    "Management in Detail": "management-in-detail",
    "Production": "/production", 
    "Engineering": "/engineering",
    "Maintenance": "/maintenance",
    "Engineering - Rates, Costs, APC": "/engineering-rates-costs-apc",  
    "Maintenance - Operational": "/maintenance-operational", 
    "Maintenance - Alarms": "maintenance-alarms", 
    "Downtime Trends KPI": "downtime-trends", 
    "Engineering - Alarms": "engineering-alarms", 
    "Operator Equipment Performance": "operator-equipment-performance", 
    "Equipment Drive Status": "equipment-drive-status",
    "Engineering Equipment Performance": "engineering-equipment-performance", 
    "Producing Accounting Daily Report": "production-accounting-report",  

    
};


const HomePage = () => {
    return (
        <Box p={6}>
            <Heading mb={6}>Dashboards Portal</Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={6}>
                {allDashboardLabels.map((label) => {
                    const isActive = activeDashboards.hasOwnProperty(label);
                    const linkTo = isActive ? activeDashboards[label] : "#";

                    return (
                        <Link to={linkTo} key={label} style={{ textDecoration: 'none', pointerEvents: isActive ? 'auto' : 'none' }}>
                            <VStack
                                p={5}
                                bg={isActive ? "blue.800" : "gray.700"}
                                borderRadius="lg"
                                boxShadow="md"
                                h="150px"
                                justify="center"
                                align="center"
                                textAlign="center"
                                opacity={isActive ? 1 : 0.5}
                                cursor={isActive ? "pointer" : "not-allowed"}
                                _hover={{ transform: isActive ? "translateY(-5px)" : "none", boxShadow: isActive ? "xl" : "md" }}
                                transition="all 0.2s ease-in-out"
                            >
                                <Text fontWeight="bold" fontSize="lg">{label}</Text>
                            </VStack>
                        </Link>
                    );
                })}
            </SimpleGrid>
        </Box>
    );
};

export default HomePage;
