import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Heading, VStack } from "@chakra-ui/react";
import { type ApexOptions } from 'apexcharts';
import DashboardCard from '../common/DashboardCard';
import DashboardCardSkeleton from '../common/DashboardCardSkeleton';
import DashboardCardErrorMessage from '../common/DashboardCardErrorMessage';

// Use the correct API URL (Direct Connect)
const API_BASE_URL = 'http://localhost:3001';

interface AlarmData {
    ShiftStart: string; // The timestamp of the shift start
    Urgent: number;
    High: number;
    Low: number;
}

interface Props {
    widgetName: string;
    daysBack?: number;
}

const AlarmSummaryStackedColumnWidget = ({ widgetName, daysBack = 7 }: Props) => {
    const [series, setSeries] = useState<any[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Helper to calculate the exact time range for "Last 7 Days"
    // aligned to 12-hour shifts (starting at 6:00 or 18:00)
    const calculateTimeRange = () => {
        
        const now = new Date();
        // Go back 'daysBack' days
        const startTime = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));
        return {
            start: startTime.toISOString(),
            end: now.toISOString()
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const { start, end } = calculateTimeRange();

                const response = await fetch(`${API_BASE_URL}/api/alarm-summary`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ startTime: start, endTime: end }),
                });

                if (!response.ok) {
                    throw new Error(`API Error: ${response.statusText}`);
                }
                const result: AlarmData[] = await response.json();

                // Format data for the chart
                // Categories: Formatted Shift Names (e.g., "04 Dec Day", "04 Dec Night")
                const newCategories = result.map(item => {
                    const date = new Date(item.ShiftStart);

                    //const hour = date.getHours();
                    const hour = date.getUTCHours();
                    const day = date.getDate();
                    
                    const month = date.toLocaleString('default', { month: 'short' });

                    const shiftName = hour === 6 ? 'Day Shift' : 'Night Shift';
                    return `${day} ${month} ${shiftName}`;
                });

                // Series: Stacked data (Low at bottom, High middle, Urgent top)
                const newSeries = [
                    { name: 'Urgent Alarm', data: result.map(r => r.Urgent) },
                    { name: 'High Alarm', data: result.map(r => r.High) },
                    { name: 'Low Alarm', data: result.map(r => r.Low) }
                ];

                setCategories(newCategories);
                setSeries(newSeries);

            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [daysBack]);

    if (isLoading) return <DashboardCardSkeleton h={400} />;
    if (error) return <DashboardCardErrorMessage/>;

    const options: ApexOptions = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true, // This enables the stacking
            toolbar: { show: true },
            zoom: { enabled: true }
        },
        // Colors: Red (Urgent), Yellow (High), Turquoise (Low)
        // Matches the order of the series array
colors: ['#FF4560', '#FEB019', '#40E0D0'], 
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '60%',
                borderRadius: 0
            },
        },
        dataLabels: {
            enabled: true,
            style: { 
                colors: ['#FFFFFF'], // Black text for better contrast on bright colors
                fontSize: '12px'
            } 
        },
        xaxis: {
            categories: categories,
            labels: {
                rotate: -45,
                style: { colors: '#FFFFFF',
                    fontSize: '15px'
                 }  
            }
        },
        yaxis: {
            title: {
                text: 'Total Alarm Number',
                style: { color: '#FFFFFF',
                    fontSize: '15px' }
            },
            labels: {
                style: { colors: '#FFFFFF',
                    fontSize: '15px' }
            }
        },
        legend: {
            position: 'top',
            labels: { colors: '#FFFFFF' } 
        },
        grid: {
            borderColor: '#555',
            strokeDashArray: 3
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: (val) => val.toString()
            }
        }
    };

    return (
        <DashboardCard>
            <VStack align="stretch" spacing={4}>
                <Heading size="md">{widgetName}</Heading>
                <Box>
                    <ReactApexChart options={options} series={series} type="bar" height={350} width="100%" />
                </Box>
            </VStack>
        </DashboardCard>
    );
};

export default AlarmSummaryStackedColumnWidget;
