import React, { useState } from 'react';
import { Box, Button, Grid, GridItem, Heading, HStack, Text, VStack, useColorModeValue } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

// IMPORT YOUR EXISTING WIDGET
// Make sure the path matches where you keep your library widgets
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag"; 
import Widget_SingleValue from "../components/widgets/Widget_SingleValue";
import AlarmSummaryStackedColumnWidget from "../components/widgets/AlarmSummaryStackedColumnWidget";
import DowntimeStackedColumnWidget from "../components/widgets/DowntimeStackedColumnWidget";
import HeatMapChart from "../components/widgets/HeatMapChart";




// --- 1. CONFIGURATION ---
// Define the Areas and the specific tags for each.
const AREA_CONFIG = [
    { id: "AttritionCells",
        label: "Attrition Cells",
        widgetTitle: "Attrition Cells KPI",
        // The 2-3 tags you want to see for the Crusher
        tags: [ "Attrition_and_Flotation_Area_ID_Out_M_SlimesGeneration",  // AttritionCell_Cluster_ID_Out_SlimesGeneration
                "310A_AC_OUT_Residence_Time",  //AttritionCell_Cluster_OUT_Residence_Time
        ],
        names:  ["Slimes Generation, %", 
                "Solids Residence Time, sec" ] 
    },

    { id: "AttritionDewateringCyclones",
        label: "Attrition Dewatering Cyclones",
        widgetTitle: "Attrition Dewatering Cyclones  KPI",
        // The tags for the Mill
        tags: ["310A_CY_01_ID_In_SolidConcentration", 
            "310A_CY_01_ID_OutLight_SolidConcentration",
            "310A_CY_01_ID_OutHeavy_SolidConcentration"],
        names:  ["Attrition Dewatering Cyclone, Solids %", 
                "Attrition Dewatering Cyclones Overflow, %",
                "Attrition Dewatering Cyclones Underflow, %" ]
    }, 

    { id: "FlotationCells",
        label: "Flotation Cells",
        widgetTitle: "Flotation Cells KPI",
        // The tags for the Conveyor
        tags: ["320A_FC_01_05_OUT_Residence_Time", 
            "320A_FC_01_05_ID_In_SolidConcentration"],

        names:  ["Flotation Cells Slurry Resident Time, sec", 
            "Flotation Cells,  Solids %"]
    },

    { id: "FlotationDewateringCyclones",
        label: "Flotation Dewatering Cyclones",
        widgetTitle: "Flotation Dewatering Cyclones KPI",
        // The tags for the Conveyor
        tags: ["320A_CY_01_ID_OutLeavy_Size2", 
            "320A_CY_01_ID_OutHeavy_SolidConcentration", 
            "320A_CY_01_ID_In_SolidConcentration"],

        names:  ["Cyclones Overflow, % 40µm", 
            "Cyclones Underflow, %", 
            "Dewatering Cyclone,  Solids %"]
    },
    
    { id: "Hydrosizer",
        label: "Hydrosizer",
        widgetTitle: "Hydrosizer KPI",
        // The tags for the Conveyor
        tags: ["Classification_Area_ID_Out_M_HS_Light_160_200", 
            "Classification_Area_ID_Out_M_HS_Heavy50",  ],

        names:  ["Hydrosizer Overflow % Coarse Solids", 
            "Hydrosizer, Cut Size % D50",  ]
    },

    { id: "PrimaryDeslimeCyclones",
        label: "Primary Deslime Cyclones",
        widgetTitle: "Primary Deslime Cyclones KPI",
        // The tags for the Conveyor
        tags: ["230A_CY_02_ID_OutHeavy_Size2", 
            "230A_CY_02_ID_In_SolidConcentration",
            "230A_CY_02_OUT_OutLight_W",
            "230A_CY_02_ID_OutHeavy_SolidConcentration"
          ],

        names:  ["Primary Deslime Cyclone Underflow, % -40 µm", 
            "Primary Deslime Cyclone, Solids %",
        "Primary Deslime Cyclones Overflow, %",
        "Primary Deslime Cyclones Underflow, %"
      ]
    },

    { id: "PrimaryWashCyclone",
        label: "Primary Wash Cyclone",
        widgetTitle: "Primary Wash Cyclone KPI",
        // The tags for the Conveyor
        tags: ["220A_CY_01_ID_OutLight_SolidConcentration",
            "220A_CY_01_ID_OutHeavy_SolidConcentration",
            "220A_CY_01_ID_In_SolidConcentration"
          ],

        names:  ["Primary Wash Cyclone Overflow % 125mu D50",
        "Primary Wash Cyclone Underflow % 125mu D50",
        "Primary Wash Cyclone,  Solids %"
      ]
    },

    { id: "SecondaryDeslimeCyclones",
        label: "Secondary Deslime Cyclones",
        widgetTitle: "Secondary Deslime Cyclones KPI",
        // The tags for the Conveyor
        tags: ["310A_CY_02_ID_OutLeavy_Size2",
            "310A_CY_02_ID_In_SolidConcentration"
          ],

        names:  ["Secondary Deslime Cyclones  Overflow, % 40µm",
        "Secondary Deslime Cyclones ,  Solids %"
      ]
    },

    { id: "TertiaryDeslimeCyclones",
        label: "Tertiary Deslime Cyclones",
        widgetTitle: "Tertiary Deslime Cyclones KPI",
        // The tags for the Conveyor
        tags: ["310A_CY_03_ID_In_SolidConcentration",
            "310A_CY_03_ID_OutLeavy_Size2"
          ],

        names:  ["Tertiary Deslime Cyclones ,  Solids %",
        "Tertiary Deslime Cyclones Overflow, % 40µm"
      ]
    },

    { id: "Thickener",
        label: "Thickener",
        widgetTitle: "Thickener KPI",
        // The tags for the Conveyor
        tags: ["400A_TH_01_ID_LVL",
            "400A_TH_01_OUT_FlocculantConsumption",
            "400A_TH_01_ID_GB1_Torque",
            "400A_TH_01_ID_GB2_Torque", 
            "400A_TH_01_ID_GB3_Torque", 
          ],

        names:  ["hickener Bed Level, m",
            "Thickener Flocculant Consumption (g/L)",
            "Torque Transducer Rake Drive Gear Box-1",
            "Torque Transducer Rake Drive Gear Box-2", 
            "Torque Transducer Rake Drive Gear Box-3", 
      ]
    },

    { id: "Wash product Dewatering Cyclones",
        label: "Wash product Dewatering Cyclones",
        widgetTitle: "Wash product Dewatering Cyclones KPI",
        // The tags for the Conveyor
        tags: ["230A_CY_01_ID_In_SolidConcentration",
            "230A_CY_01_ID_OutLight_SolidConcentration",
            "230A_CY_01_ID_OutHeavy_SolidConcentration",
            "230A_CY_01_ID_OutHeavy_Size1",  
          ],

        names:  ["Wash Product Dewatering Cyclone,  Solids %",
            "Wash Product Dewatering Cyclones Overflow, %",
            "Wash Product Dewatering Cyclones Underflow, %",
            "Wash Product Dewatering Cyclones Underflow, < 160/200 µm",  
      ]
    },

    
];

const AreaOverviewPage = () => {
    
    const assetNames_Lines = [ 
        "Main_Plant_Line",  
    ];
 

    const assetNames_MainPlantLine = [   
        "130G_WP_01_02", 
        "220A_HS_03", 
        "220A_HS_02", 
        "220A_HS_01",
        "310A_AC_09_12", 
        "310A_AC_05_08", 
        "310A_AC_01_04",   
        "Water_and_Utilities_Area", 
        "Tailings_Thickener_and_Flocculant_Preparation", 
        "Tailings_Handling_and_Storage_Area",  
        "Amine_Preparation_Line",
        "Acid_Preparation_Line", 
        "Compressor_Air_Services_Utility_Area"
    ];
     

    // State to track which button is active
    const [selectedAreaId, setSelectedAreaId] = useState(AREA_CONFIG[0].id);

    // Get the full config object for the selected ID
    const currentArea = AREA_CONFIG.find(area => area.id === selectedAreaId) || AREA_CONFIG[0];

    // Colors for the buttons
    const activeBg = useColorModeValue('blue.500', 'blue.200');
    const activeColor = useColorModeValue('white', 'gray.900');
    const inactiveBg = useColorModeValue('gray.100', 'gray.700');

    // --- TIME CALCULATION (Last 24 Hours) ---
    // We calculate this here and pass it to the widget
    const endTime = new Date().toISOString();
    const startTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    
    // Calculate the start and end time for the API request
    const endTime_DT = new Date();
    const startTime_DT = new Date();
    startTime_DT.setDate(endTime_DT.getDate() - 14); // 2 weeks (14 days) before now

    return (
        <Box p={4} minH="100vh">
            <VStack spacing={6} align="stretch"> 
                
                <Box display="flex" alignItems="center">
                    <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
                        Back to Portal
                    </Button>
                    <Heading ml={6}>Engineering Equipment Performance</Heading>
                </Box>
 
                    <Grid templateColumns="repeat(7, 1fr)" gap={6}>

                        <GridItem colSpan={{ base: 1, md: 1, xl: 1 }}>  
                            <DowntimeStackedColumnWidget
                                widgetName="Main Line"
                                assetNames={assetNames_Lines}
                                startTime={startTime_DT.toISOString()}
                                endTime={endTime_DT.toISOString()}
                            /> 
                        </GridItem>  

                        <GridItem colSpan={{ base: 3, md: 3, xl: 3 }}> 
                            <DowntimeStackedColumnWidget
                                widgetName="Main Line Key Assets"
                                assetNames={assetNames_MainPlantLine}
                                startTime={startTime_DT.toISOString()}
                                endTime={endTime_DT.toISOString()}
                            /> 
                        </GridItem> 
                        
                        <GridItem colSpan={{ base: 3, md: 3, xl: 3 }}>
                            <AlarmSummaryStackedColumnWidget
                                widgetName="Total Alarms Summary (from Dynamo)" 
                                daysBack={7}
                            /> 
                        </GridItem> 
                        
                    </Grid>  


                <Box bg={useColorModeValue('white', 'gray.800')} p={4} borderRadius="xl" shadow="md">
                    <HStack spacing={4} wrap="wrap">
                        {AREA_CONFIG.map((area) => {
                            const isActive = area.id === selectedAreaId;
                            return (
                                <Button
                                    key={area.id}
                                    onClick={() => setSelectedAreaId(area.id)}
                                    // Visual Styling
                                    bg={isActive ? activeBg : inactiveBg}
                                    color={isActive ? activeColor : 'inherit'}
                                    _hover={{ opacity: 0.8 }}
                                    size="md"
                                >
                                    {area.label}
                                </Button>
                            );
                        })}
                    </HStack>
                </Box>

                {/* --- BOTTOM SECTION: THE WIDGET --- */}
                <Box>
                    <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                        {/* Full Width Grid Item for the Trend */}
                        <GridItem colSpan={12}>
                            {/* USAGE OF YOUR EXISTING WIDGET 
                                React automatically detects when 'tagNames' changes 
                                and refreshes the chart.
                            */}
							<TrendSeries_MultiTag 
                                widgetName={currentArea.widgetTitle}
                                trendNames={currentArea.names}
                                tagNames={currentArea.tags}
                                timePeriodInHours={24}
                                
                            /> 

                        </GridItem>
                    </Grid>
                </Box>

                

            </VStack>
        </Box>
    );
};

 

export default AreaOverviewPage;