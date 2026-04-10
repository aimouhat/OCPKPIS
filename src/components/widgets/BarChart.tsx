import { Box, Heading } from "@chakra-ui/react";
import ReactApexChart from "react-apexcharts";
import { useKpiData } from "../../hooks/useKpiData";
import DashboardCard from "../common/DashboardCard";
import DashboardCardSkeleton from "../common/DashboardCardSkeleton";
import DashboardCardErrorMessage from "../common/DashboardCardErrorMessage";
import type { ApexOptions } from "apexcharts";
import type { ApiType } from "../../types";

// Define the structure for each bar in the chart
interface BarChartItem {
    label: string; // This will be the name of the bar on the x-axis
    tagName: string;
}

interface Props {
    widgetName: string;
    apiType: ApiType; // Allow specifying API_Actual or API_Aggregated
    items: BarChartItem[];
    timePeriodInHours?: number; // Optional for API_Aggregated
}

const BarChart = ({ widgetName, apiType, items, timePeriodInHours }: Props) => {
    // Extract tag names for the API call
    const tagNames = items.map(item => item.tagName);

    // Fetch data using the generic useKpiData hook
    const { data, isLoading, error } = useKpiData({
        apiType,
        tagNames,
        timePeriodInHours,
    });

    // Handle loading and error states
    if (isLoading) return <DashboardCardSkeleton h={350} />;
    if (error || !data) return <DashboardCardErrorMessage />;
 
    // Prepare the data for the ApexCharts series
    const series = [{
        name: widgetName, // The legend name for the series
        data: items.map(item => {
            const record = data.find(d => d.tagname === item.tagName); 
            // ApexCharts can handle null values for missing data points
            return (record && record.value !== null) ? Number(record.value) : null;
        })
    }];

    // Configure the chart options
    const options: ApexOptions = {
        chart: {
            type: 'bar',
            height: 350,
            foreColor: '#fff',
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                horizontal: false, // Vertical bars
                columnWidth: '55%',
                distributed: true, // Gives each bar its own color, though we set them all to green
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                colors: ['#fff']
            },
            offsetY: -20
        },
        xaxis: {
            categories: items.map(item => item.label), // Use item labels for the x-axis categories
            labels: {
                style: {
                    colors: '#CBD5E0',
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#CBD5E0',
                },
                formatter: (val) => val.toFixed(0),
            }
        },
        tooltip: {
            theme: 'dark',
        },
        colors: ['#38A169'], // Default green color for bars
        legend: {
            show: false // Hide legend as bar names are on the x-axis
        },
        grid: {
            borderColor: '#4A5568'
        }
    };

    return (
        <DashboardCard>
            <Heading size="md" mb={4}>{widgetName}</Heading>
            <Box>
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </Box>
        </DashboardCard>
    );
};

export default BarChart;
