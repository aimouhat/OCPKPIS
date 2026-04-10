import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Heading, VStack, Text, Input, Flex  } from "@chakra-ui/react";
import type { ApexOptions } from 'apexcharts';
import DashboardCard from '../common/DashboardCard';
import DashboardCardSkeleton from '../common/DashboardCardSkeleton';
import DashboardCardErrorMessage from '../common/DashboardCardErrorMessage';
import type { DowntimeRecord, DowntimeRequestParams } from '../../types/downtime';

//const API_BASE_URL = `http://localhost:${import.meta.env.VITE_API_PORT || 3001}`;
//const API_BASE_URL = ``;
const API_BASE_URL = `http://localhost:3001`;

// --- Data Fetching Logic ---
const fetchDowntimeData = async (params: DowntimeRequestParams): Promise<DowntimeRecord[]> => {
    const response = await fetch(`${API_BASE_URL}/api/downtime`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch downtime data. Server says: ${errorText}`);
    }

    return response.json();
};


interface Props {
    widgetName: string;
    assetNames: string[];
    startTime: string;
    endTime: string;
}

const DowntimeStackedColumnWidget = ({ widgetName, assetNames, startTime, endTime }: Props) => {
    const [data, setData] = useState<DowntimeRecord[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Initialize local state from props, formatting to YYYY-MM-DD for the input
    const [startDate, setStartDate] = useState<string>(() => startTime ? new Date(startTime).toISOString().split('T')[0] : "");
    const [endDate, setEndDate] = useState<string>(() => endTime ? new Date(endTime).toISOString().split('T')[0] : "");

    // Sync local state if props change (e.g. global dashboard filter updates)
    useEffect(() => {
        if (startTime) setStartDate(new Date(startTime).toISOString().split('T')[0]);
        if (endTime) setEndDate(new Date(endTime).toISOString().split('T')[0]);
    }, [startTime, endTime]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Use local state dates for the API call
                const result = await fetchDowntimeData({ assetNames, startTime: startDate, endTime: endDate });
                setData(result);
            } catch (e) {
                setError(e as Error);
            } finally {
                setIsLoading(false);
            }
        };

        if (startDate && endDate) {
            fetchData();
        }
    }, [assetNames, startDate, endDate]);


    if (isLoading) return <DashboardCardSkeleton h={400} />;
    if (error || !data) return <DashboardCardErrorMessage />;

    // --- Chart Data Transformation ---
    const categories = data.map(asset => asset.DisplayName);

    // Helper to convert hours to days, handling nulls
    const toDays = (hours: number | null) => (hours || 0) / 24;
    
    const series = [
        {
            name: 'Operation Time (OT)',
            data: data.map(asset => toDays(asset.OT)),
            color: '#00E396' // Green
        },
        {
            name: 'Unclassified (STOP)',
            data: data.map(asset => toDays(asset.STOP)),
            color: '#808080' // Grey
        },
        {
            name: 'Operational Delays (OD)',
            data: data.map(asset => toDays(asset.OD)),
            color: '#FF4560' // Red
        },
        {
            name: 'Standby (SD)',
            data: data.map(asset => toDays(asset.SD)),
            color: '#FEB019' // Yellow/Orange
        },
        {
            name: 'Unscheduled Maintenance (UM)',
            data: data.map(asset => toDays(asset.UM)),
            color: '#775DD0' // Purple
        },
        {
            name: 'Scheduled Maintenance',
            data: data.map(asset => toDays(asset['Scheduled Maintenance'])),
            color: '#008FFB' // Blue
        },
    ];

    // --- Chart Options ---
    const options: ApexOptions = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: { show: false },
            zoom: { enabled: true }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 4,
            },
        },
        xaxis: {
            categories: categories,
            labels: {
                style: {
                    colors: '#FFFFFF'
                }
            }
        },
        yaxis: {
            title: {
                text: 'Days',
                style: {
                    color: '#FFFFFF'
                }
            },
            labels: {
                 style: {
                    colors: '#FFFFFF'
                },
                formatter: function (val: number) {
                    return val.toFixed(1);
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            labels: {
                colors: '#FFFFFF'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: (val: number) => `${val.toFixed(2)} days`
            },
            theme: 'dark'
        },
        dataLabels: {
            enabled: false // Labels on bars can get crowded
        }
    };

    return (
        <DashboardCard>
            <VStack align="stretch" spacing={4}>
                <Heading size="md">{widgetName}</Heading>

                <Flex direction={{ base: "column", md: "row" }} gap={4} align="end">
                    
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


                </Flex>
                <Box>
                    <ReactApexChart options={options} series={series} type="bar" height={350} />
                </Box>
            </VStack>
        </DashboardCard>
    );
};

export default DowntimeStackedColumnWidget;
