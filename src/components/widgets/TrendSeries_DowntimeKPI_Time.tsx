import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Heading, VStack, HStack, Select, Button, Text, Input, Flex } from "@chakra-ui/react";
import DashboardCard from '../common/DashboardCard';
import DashboardCardSkeleton from '../common/DashboardCardSkeleton';
import DashboardCardErrorMessage from '../common/DashboardCardErrorMessage';
import type { ApexOptions } from 'apexcharts';

// API Configuration
const API_BASE_URL = `http://localhost:3001`;

interface Props {
    widgetName: string;
}

// 1. Configuration Constants
const PRODUCTION_LINES = [
    "Inload_Stacking_Line", 
    "Inload_Reclaiming_Line", 
    "Main_Plant_Line", 
    "Outload_Reclaiming_Line", 
    "Outload_Delivery_Line", 
];

const KPI_CONFIG = [
    { key: 'OD', label: 'Operational Delay (OD)', color: '#00E396' },
    { key: 'SD', label: 'Standby (SD)', color: '#FEB019' },
    { key: 'UM', label: 'Unscheduled Maintenance (UM)', color: '#FF4560' },
    { key: 'Scheduled Maintenance', label: 'Scheduled Maintenance (SM)', color: '#775DD0' },
    { key: 'STOP', label: 'Unclassified (STOP)', color: '#959595ff' }
];

const TrendSeries_DowntimeKPI_Time = ({ widgetName }: Props) => {
    // --- STATE ---
    const [selectedLine, setSelectedLine] = useState<string>("Main_Plant_Line");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    
    const [series, setSeries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // --- INITIALIZATION ---
    useEffect(() => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 7);
        
        setEndDate(end.toISOString().split('T')[0]);
        setStartDate(start.toISOString().split('T')[0]);
    }, []);

    // --- DATA FETCHING LOGIC (SEQUENTIAL VERSION) ---
    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // 1. Generate array of Day Objects
            const dayList: { start: string, end: string, displayDate: number }[] = [];
            
            let current = new Date(startDate || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
            let stopDate = new Date(endDate || Date.now());
            
            current.setHours(0,0,0,0);
            stopDate.setHours(23,59,59,999);

            while (current <= stopDate) {
                const dayStart = new Date(current);
                dayStart.setHours(0, 0, 0, 0);
                
                const dayEnd = new Date(current);
                dayEnd.setHours(23, 59, 59, 999); 
                dayEnd.setTime(dayEnd.getTime()+(5*10*1000))

                dayList.push({
                    start: dayStart.toISOString(),
                    end: dayEnd.toISOString(),
                    displayDate: dayStart.getTime()
                });

                current.setDate(current.getDate() + 1);
            }

            // 2. SEQUENTIAL API EXECUTION (One by One)
            const results: any[] = [];

            // We use a "for...of" loop with "await" inside.
            // This forces the code to PAUSE until the current request finishes 
            // before starting the next one.
            for (const day of dayList) {
                try {
                    const response = await fetch(`${API_BASE_URL}/api/downtime`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                            assetNames: [selectedLine], 
                            startTime: day.start, 
                            endTime: day.end 
                        }),
                    });
					if (!response.ok) throw new Error(response.statusText);
                    
                    const json = await response.json();
                    
                    // Success: Add data to results
                    if (json && json.length > 0) {
                        results.push({ ...json[0], timestamp: day.displayDate });
                    } else {
                        // Fallback if API returns empty array for that day
                        results.push({ timestamp: day.displayDate }); 
                    }

                } catch (dayError) {
                    console.error(`Failed to fetch data for ${day.start}`, dayError);
                    // If one day fails, we push a safe "Empty" object so the chart 
                    // line doesn't break, but we log the error.
                    results.push({ timestamp: day.displayDate });
                }
            }

            // 3. Transform Data for ApexCharts
            const newSeries = KPI_CONFIG.map(kpi => {
                return {
                    name: kpi.label,
                    data: results.map(dayResult => ({
                        x: dayResult.timestamp,
                        y: (dayResult[kpi.key] || 0).toFixed(2)
                    }))
                };
            });

            setSeries(newSeries);

        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err : new Error("Unknown error"));
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-fetch
    useEffect(() => {
        if (startDate && endDate) {
            fetchData();

            // Set up auto-refresh every 60 minutes (3600000 ms)
            const intervalId = setInterval(fetchData, 60 * 60 * 1000);

            // Cleanup function: clears the timer if the component unmounts or dependencies change
            return () => clearInterval(intervalId);
        }
    }, [startDate, endDate, selectedLine]);

    // --- CHART OPTIONS ---
    const options: ApexOptions = {
        chart: {
            type: 'line',
            height: 350,
            background: 'transparent',
            toolbar: { show: false },
            zoom: { enabled: false } 
        },
        colors: KPI_CONFIG.map(k => k.color), 
        stroke: {
            width: 5,
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            title: { text: 'Date', style: { color: '#FFF' } },
            labels: {
                style: { colors: '#FFF',
                    fontSize: '16px'
                },
                datetimeFormatter: {
                    year: 'yyyy',
                    month: "MMM 'yy",
                    day: 'dd MMM'
                }
            },
            tooltip: { enabled: false } 
        },
        yaxis: {
            title: { text: 'Hours', style: { color: '#FFF',
                    fontSize: '16px' } },
            labels: { 
                style: { colors: '#FFF', 
                    fontSize: '16px'
                 },
                formatter: (val) => val.toFixed(1)
            }
        },
        legend: {
            position: 'top',
            fontSize: '16px',
            labels: { colors: '#FFF' }
        },
        grid: {
            borderColor: '#444',
            strokeDashArray: 3
        },
        tooltip: {
            theme: 'dark',
            x: { format: 'dd MMM yyyy' }
        }
    };

    // --- RENDER ---
    return (
        <DashboardCard>
            <VStack align="stretch" spacing={4}>
                <Heading size="md" textAlign="center">{widgetName}</Heading>

                {/* Control Panel */}
                <Flex direction={{ base: "column", md: "row" }} gap={4} align="end">
                    <Box>
                        <Text fontSize="sm" mb={1} color="gray.400">Production Line Selector</Text>
                        <Select 
                            value={selectedLine} 
                            onChange={(e) => setSelectedLine(e.target.value)}
                            size="sm" width="220px" bg="gray.700" borderColor="gray.600" color="white"
                        >
                            {PRODUCTION_LINES.map(line => (
                                <option key={line} value={line} style={{ color: "white" }}>
                                    {line}
                                </option>
                            ))}
                        </Select>
                    </Box>
					<Box>
                        <Text fontSize="sm" mb={1} color="gray.400">Start Date</Text>
                        <Input 
                            type="date" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)}
                            size="sm" bg="gray.700" borderColor="gray.600" color="white"
                        />
                    </Box>

                    <Box>
                        <Text fontSize="sm" mb={1} color="gray.400">End Date</Text>
                        <Input 
                            type="date" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)}
                            size="sm" bg="gray.700" borderColor="gray.600" color="white"
                        />
                    </Box>

                    <Button 
                        colorScheme="blue" 
                        size="sm" 
                        onClick={fetchData}
                        isLoading={isLoading}
                    >
                        Update
                    </Button>
                </Flex>

                {/* Chart Area */}
                <Box h="600px">
                    {isLoading && !series.length ? (
                        <DashboardCardSkeleton h="400px" />
                    ) : error ? (
                        <DashboardCardErrorMessage />
                    ) : (
                        <ReactApexChart 
                            options={options} 
                            series={series} 
                            type="line" 
                            height={500} 
                            width="100%" 
                        />
                    )}
                </Box>
            </VStack>
        </DashboardCard>
    );
};

export default TrendSeries_DowntimeKPI_Time;
