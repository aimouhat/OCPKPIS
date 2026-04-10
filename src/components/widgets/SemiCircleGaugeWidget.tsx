import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import ReactApexChart from "react-apexcharts";
import { useKpiData } from "../../hooks/useKpiData";
import DashboardCard from "../common/DashboardCard";
import DashboardCardSkeleton from "../common/DashboardCardSkeleton";
import DashboardCardErrorMessage from "../common/DashboardCardErrorMessage";
import type { ApexOptions } from "apexcharts";
import type { ApiType } from "../../types";

interface Props {
    widgetName: string;
    label: string;
    tagName: string;
    apiType: "API_Actual" | "API_Aggregated";
    maxValue?: number;
    timePeriodInHours?: number; // Required only for API_Aggregated
    unit?: string; // Optional unit to display
}

const SemiCircleGaugeWidget = ({
    widgetName,
    label,
    tagName,
    apiType,
    maxValue = 100,  
    timePeriodInHours,
    unit = '',
}: Props) => {

    const { data, isLoading, error } = useKpiData({
        apiType,
        tagNames: [tagName],
        timePeriodInHours,
    });

    if (isLoading) return <DashboardCardSkeleton h={250} />;
    if (error || !data || data.length === 0) return <DashboardCardErrorMessage />;
    
    
    const formatValue = (val: any) => {
        // Case A: Database sent explicit NULL or didn't send the field
        if (val === null || val === undefined) {
            return "N/A"; 
        }
        
        // Case B: Database sent a valid number (e.g. 50.123)
        const num = Number(val);
        if (!isNaN(num)) {
            return num.toFixed(2); // Format to 2 decimal places
        }

        // Case C: Database sent a string that isn't a number (e.g. "Error")
        return String(val);
    };

    const singleValue = data[0].value;

    // The series for a radial bar chart is the percentage value
    const seriesData = [(singleValue / maxValue) * 100];

    const options: ApexOptions = {
        chart: {
            type: 'radialBar',
            offsetY: -20,
            sparkline: {
                enabled: true
            },
            foreColor: "#fff",
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                hollow: {
                    margin: 0,
                    size: '70%',
                },
                track: {
                    background: "#333", // Darker background for the track
                    strokeWidth: '97%',
                    margin: 0,
                },
                dataLabels: {
                    name: {
                        show: false, // The main label is shown outside the chart
                    },
                    value: {
                        offsetY: -2,
                        fontSize: '22px',
                        formatter: () => `${singleValue.toFixed(2)} ${unit}`.trim(), // Show absolute value
                    }
                }
            }
        },
        grid: {
            padding: {
                top: -10
            }
        },
        fill: {
            colors: ['#00E396'], // Green color for the bar
        },
        labels: [label], // This is used for the tooltip, not the main display
        tooltip: {
            enabled: true,
            theme: "dark",
        }
    };

    return (
        <DashboardCard>
            <VStack h="100%" justify="space-between">
                <Heading size="md" textAlign="center">{widgetName}</Heading>
                <Box>
                    <ReactApexChart 
                    options={options} 
                    series={seriesData} 
                    type="radialBar" 
                    height={250} />
                </Box>
                <Text fontSize="lg" fontWeight="bold" mt={-10}>{label}</Text>
            </VStack>
        </DashboardCard>
    );
};

export default SemiCircleGaugeWidget;
