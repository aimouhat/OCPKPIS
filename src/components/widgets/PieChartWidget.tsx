import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Heading, VStack } from "@chakra-ui/react";
import { useKpiData } from '../../hooks/useKpiData';
import DashboardCard from '../common/DashboardCard';
import DashboardCardSkeleton from '../common/DashboardCardSkeleton';
import DashboardCardErrorMessage from '../common/DashboardCardErrorMessage';
import { type ApiType } from '../../types';

// Define the shape of a single item/segment for this widget
interface PieChartItem {
    label: string;      // The name of the segment to display in the legend
    tagName: string;    // The SQL tag name to fetch data for
}

interface Props {
    widgetName: string;
    items: PieChartItem[];
    // Ensure only valid API types for this kind of visualization are used
    apiType: Extract<ApiType, "API_Actual" | "API_Aggregated">;
    // Aggregated calls might need a time period, so we make it optional
    timePeriodInHours?: number;
}

const PieChartWidget = ({ widgetName, items, apiType, timePeriodInHours = 24 }: Props) => {
    // Extract all tag names to make a single API call
    const tagNames = items.map(item => item.tagName);

    // Use the custom data fetching hook
    const { data, isLoading, error } = useKpiData({
        apiType,
        tagNames,
        // Pass the time period, which is mainly for API_Aggregated
        timePeriodInHours,
    });

    // Display a loading state while fetching data
    if (isLoading) return <DashboardCardSkeleton h={400} />;
    // Display an error message if the fetch fails
    if (error || !data) return <DashboardCardErrorMessage />;

    // --- Prepare data for ApexCharts Pie Chart ---
    // The 'series' is an array of numbers representing the value of each segment.
    // The 'labels' are an array of strings for each segment's name.
    const chartSeries: number[] = [];
    const chartLabels: string[] = [];

    // Map the fetched data to the series and labels arrays
    items.forEach(item => {
        const record = data.find(d => d.tagname === item.tagName);
        chartLabels.push(item.label);
        // Use the found value, or 0 if no data was returned for that tag
        chartSeries.push(record ? record.value : 0);
    });

    const options: ApexCharts.ApexOptions = {

        chart: {
            type: 'pie',
            toolbar: { show: false}
        },

        labels: chartLabels,

        legend: {
            position: 'bottom',
            labels: {
                colors: '#FFFFFF',
            },
            horizontalAlign: 'center',

        },

        responsive: [{
            breakpoint: 480, // For smaller screens
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],

        dataLabels: {
            enabled: true,
            
            formatter: function (val, opts) {
                const seriesValue = opts.w.globals.series[opts.seriesIndex];
                
                const formattedValue = Number.isInteger(seriesValue) ? seriesValue : seriesValue.toFixed(2);
                return `${formattedValue} (${Number(val).toFixed(1)}%)`;
            }
        },
        tooltip: {
            y: {
                formatter: (val) => val.toFixed(2) // Format tooltip value
            }
        }
    };

    return (
        <DashboardCard>
            <VStack align="stretch" spacing={4}>
                <Heading size="md" textAlign="center">{widgetName}</Heading>
                <ReactApexChart options={options} series={chartSeries} type="pie" height={350} />
            </VStack>
        </DashboardCard>
    );
};

export default PieChartWidget;

