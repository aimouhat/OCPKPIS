import { Box, Button, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TrendSeries_MultiTag from "../components/widgets/TrendSeries_MultiTag";
import RadarChart_Act_Targ from "../components/widgets/RadarChart_Act_Targ";
import Grid_KPI from "../components/widgets/Grid_KPI";
import Widget_Stockyard from "../components/widgets/Widget_Stockyard";
import HeatMapChart from "../components/widgets/HeatMapChart";
import AlarmHistoryGridWidget from "../components/widgets/AlarmHistoryGridWidget";
import AlarmSummaryStackedColumnWidget from "../components/widgets/AlarmSummaryStackedColumnWidget";

const OperatorDashboard = () => {

    const getTimeRange = (period: string): { timePeriodInHours?: number; startTime?: string; endTime?: string } => {
        const now = new Date();
        let startTime: Date, endTime: Date;

        const today6am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0, 0);
        const today6pm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0, 0);
        
        let currentShiftStart: Date;
        if (now >= today6pm) {
            currentShiftStart = today6pm;
        } else if (now >= today6am) {
            currentShiftStart = today6am;
        } else {
            currentShiftStart = new Date(today6pm.getTime() - 24 * 60 * 60 * 1000);
        }
        
        const lastShiftEnd = currentShiftStart;
        const lastShiftStart = new Date(lastShiftEnd.getTime() - 12 * 60 * 60 * 1000);
        const dayStart = new Date(lastShiftEnd.getTime() - 24 * 60 * 60 * 1000);

        switch (period) {
            case "Current shift":
                return { startTime: currentShiftStart.toISOString(), endTime: now.toISOString() };
            case "Last shift":
                return { startTime: lastShiftStart.toISOString(), endTime: lastShiftEnd.toISOString() };
            case "Day":
                return { startTime: dayStart.toISOString(), endTime: lastShiftEnd.toISOString() };
            case "Month to Date":
                startTime = new Date(now.getFullYear(), now.getMonth(), 1);
                return { startTime: startTime.toISOString(), endTime: now.toISOString() };
            case "Year to Date":
                startTime = new Date(now.getFullYear(), 0, 1);
                return { startTime: startTime.toISOString(), endTime: now.toISOString() };
            default:
                return { timePeriodInHours: 1 }; // Fallback
        }
    };
    
 return (

    <VStack spacing={6} align="stretch" p={6}>
      <Box display="flex" alignItems="center">
        <Button as={Link} to="/" leftIcon={<ArrowBackIcon />} colorScheme="gray" variant="outline">
          Back to OCP Portal
        </Button>
        <Heading ml={6}>Operator Dashboard</Heading>
      </Box>

      
      <Grid
                        templateColumns="repeat(4, 2fr)" // Creates 4 equal-width columns
                        gap={7}
                    > 
                    <GridItem colSpan={{ base: 1, md: 1, xl: 1 }}>
                        <TrendSeries_MultiTag
                        widgetName="Plant Input Feed Rate, t/h (12h)"
                        tagNames={["PlantA_OUT_In_W", "PlantA_OUT_In_W_Target"]}  
                        trendNames={["Actual", "Target"]}
                        timePeriodInHours={12}
                        />
                    </GridItem>
    
                    <GridItem colSpan={{ base: 1, md: 1, xl: 1 }}>
                        <TrendSeries_MultiTag
                        widgetName="Plant Output Feed Rate, t/h (12h)"
                        tagNames={["PlantA_OUT_Out_W", "PlantA_OUT_Out_W_Target"]}
                        trendNames={["Actual", "Target"]}
                        timePeriodInHours={12}
                        />
                    </GridItem>
    
        
                    <GridItem colSpan={{ base: 1, md: 1, xl: 1 }}>
                        <TrendSeries_MultiTag
                        widgetName="Export Feed Rate, t/h (12h)"
                        tagNames={["PlantA_OUT_Export_W", "PlantA_ID_PlantA_Export_W_Target"]}
                        trendNames={["Actual", "Target"]}
                        timePeriodInHours={12}
                        />
                    </GridItem>
    
                    <GridItem colSpan={{ base: 1, md: 1, xl: 1 }}>
                        <TrendSeries_MultiTag
                        widgetName="Import Feed Rate, t/h (12h)"
                        tagNames={["PlantA_OUT_Import_W", "PlantA_ID_PlantA_Import_W_Target"]}
                        trendNames={["Actual", "Target"]}
                        timePeriodInHours={12}
                        />
                    </GridItem> 

                </Grid>


      <Grid
        templateColumns="repeat(12, 1fr)"
        gap={6}
      >
        
        <GridItem colSpan={{ base: 12, md: 3, xl: 2 }}>
          <HeatMapChart
            widgetName="Lines Status"
            ColumnNumbers = {1}
            tiles={[
                { name: "Inload Stacking Line", tagName: "Inload_Stacking_Line_Status" },
                { name: "Inload Reclaiming Line", tagName: "Inload_Reclaiming_Line_Status" },
                { name: "Main Plant Line", tagName: "Main_Plant_Line_Status" },
                { name: "Outload Reclaiming Line", tagName: "Outload_Reclaiming_Line_Status" },
                { name: "Outload Delivery Line", tagName: "Outload_Delivery_Line_Status" },
            ]}
          />
        </GridItem> 
        
        <GridItem colSpan={{ base: 20, xl: 4 }}>
        <RadarChart_Act_Targ
                            widgetName="Production Feeds monitoring [t/h] (Current)"
                            axisNames={[ 
                            "Prod Delivery", 
                            "Import", 
                            "Plant Out", 
                            "Export", 
                            "Plant In"
                            ]}
                            actualTagNames={[
                                "RL4_OUT_Out_Dry_W",
                                "110G_ST_01_OUT_Out_Dry_W",
                                "130G_ST_01_OUT_Out_Dry_W",
                                "140G_RC_01_OUT_Out_Dry_W",
                                "210A_SB_01_OUT_Out_Dry_W",
                            ]}
                            targetTagNames={[
                                "RL4_Target_Dry_W",
                                "110G_ST_01_ID_M_Target_W",
                                "130G_ST_01_ID_M_Target_W",
                                "140G_RC_01_ID_M_Target_W",
                                "210A_SB_01ID_Target_Dry_W",
                            ]}
                    />
        </GridItem>

        <GridItem colSpan={{ base: 12, md: 3, xl: 3 }}> 
          <Grid_KPI
              widgetName="Plant Accumulated Feed, Tonnes"
              rowNames={[
                  "Plant Input Feed",
                  "Plant Output Feed",
                  "Export Feed",
                  "Import Feed"
              ]}
              columnConfigs={[
                  { name: "Current shift", timeConfig: getTimeRange("Current shift") },
                  { name: "Last shift", timeConfig: getTimeRange("Last shift") },
              ]}
              cellTags={[
                  ["210A_SB_01_OUT_Out_Dry_W", "210A_SB_01_OUT_Out_Dry_W"],
                  ["130G_ST_01_OUT_Out_Dry_W", "130G_ST_01_OUT_Out_Dry_W"],
                  ["140G_RC_01_OUT_Out_Dry_W", "140G_RC_01_OUT_Out_Dry_W"],
                  ["110G_ST_01_OUT_Out_Dry_W", "110G_ST_01_OUT_Out_Dry_W"],
              ]}
          />
        </GridItem> 
        
        <GridItem colSpan={{ base: 12, md: 12, xl: 3 }}>
            <Widget_Stockyard
                widgetName="Stockyards Availability (Current)"
                items={[
                    { label: "Inload Stockyard Actual", tagName: "120G_RC_01_OUT_SY_CurrentCapacity", unit: "Tonnes" },
                    { label: "Inload Stockyard Percentage", tagName: "120G_RC_01_OUT_SY_CurrentCapacityPercentage", unit: "%" },
                    { label: "Outload Stockyard Actual", tagName: "140G_RC_01_OUT_SY_CurrentCapacity", unit: "Tonnes" },
                    { label: "Outload Stockyard Percentage", tagName: "140G_RC_01_OUT_SY_CurrentCapacityPercentage", unit: "%" },
                ]}
            />
        </GridItem>
        

      </Grid>

      <Grid
        templateColumns="repeat(12, 1fr)"
        gap={6}
      > 
     
      <GridItem colSpan={{ base: 12, md: 6, xl: 4 }}>
        <TrendSeries_MultiTag
          widgetName="Phosphate Product Delivery, t/h (12h)"
          tagNames={["RL4_OUT_Out_Dry_W", "RL4_Target_Dry_W"]}
          trendNames={["Actual", "Target"]}
          timePeriodInHours={12}
        />
      </GridItem>

      

      <GridItem colSpan={{ base: 12, md: 6, xl: 4 }}>
        <TrendSeries_MultiTag
          widgetName="Ore Hoppers level- 210A-HP-01 , % (12h)"
          tagNames={["210A_HP_01_ID_LVLA", "210A_HP_01_ID_LVLB"]}
          trendNames={["210A_HP_01_ID_LVLA", "210A_HP_01_ID_LVLB"]}
          timePeriodInHours={12}
        />
      </GridItem>

      <GridItem colSpan={{ base: 12, md: 6, xl: 4 }}>
        <TrendSeries_MultiTag
          widgetName="Product Hoppers level- 150G-HP-01 , % (12h)"
          tagNames={["150G_HP_01_ID_LVLA", "150G_HP_01_ID_LVLB"]}
          trendNames={["150G_HP_01_ID_LVLA", "150G_HP_01_ID_LVLB"]}
          timePeriodInHours={12}
        />
      </GridItem>
      

        
      </Grid>
      
      <Box>
        <Grid
          templateColumns="repeat(12, 1fr)"
          gap={6}
        >
          <GridItem colSpan={{ base: 12, md: 6, xl: 4 }}>
            <AlarmSummaryStackedColumnWidget
                widgetName="Total Alarms Summary (from Dynamo)" 
                daysBack={3}

            />          
          </GridItem>
          
            <GridItem colSpan={{ base: 12, md: 6, xl: 8 }}>
              <AlarmHistoryGridWidget
                      widgetName="Last Active Alarms (from Dynamo)" 
                      limit={10}
                  /> 
            </GridItem>
          </Grid> 
        </Box>



      
    </VStack>
  );
};

export default OperatorDashboard;
