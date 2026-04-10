import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Heading, VStack, Text, Input, Flex } from "@chakra-ui/react";
import { type DowntimeData } from '../../types/downtime';
import DashboardCard from '../common/DashboardCard';
import DashboardCardSkeleton from '../common/DashboardCardSkeleton';
import DashboardCardErrorMessage from '../common/DashboardCardErrorMessage';

// API endpoint for downtime data
//const API_BASE_URL = `http://localhost:${import.meta.env.VITE_API_PORT || 3001}`;
//const API_BASE_URL = ``;
const API_BASE_URL = `http://localhost:3001`;

interface Props {
    widgetName: string;
    assetNames: string[];
    startTime: string;
    endTime: string;
}

// Custom hook specifically for fetching downtime data for this widget
const useDowntimeData = (assetNames: string[], startTime: string, endTime: string) => {
    const [data, setData] = useState<DowntimeData[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Prevent fetching if essential props are missing
        if (!assetNames.length || !startTime || !endTime) {
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/api/downtime`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ assetNames, startTime, endTime }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`API Error (${response.status}): ${errorText}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [assetNames, startTime, endTime]);

    return { data, isLoading, error };
};

const DownTimeHeatMap = ({ widgetName, assetNames, startTime, endTime }: Props) => {
    // Initialize local state from props, formatting to YYYY-MM-DD for the input
    const [startDate, setStartDate] = useState<string>(() => startTime ? new Date(startTime).toISOString().split('T')[0] : "");
    const [endDate, setEndDate] = useState<string>(() => endTime ? new Date(endTime).toISOString().split('T')[0] : "");

    // Sync local state if props change (e.g. global dashboard filter updates)
    useEffect(() => {
        if (startTime) setStartDate(new Date(startTime).toISOString().split('T')[0]);
        if (endTime) setEndDate(new Date(endTime).toISOString().split('T')[0]);
    }, [startTime, endTime]);

    const { data, isLoading, error } = useDowntimeData(assetNames, startDate, endDate);

    if (isLoading) return <DashboardCardSkeleton h={500} />;
    if (error || !data) return <DashboardCardErrorMessage message={error?.message || "Failed to load downtime data."} />;

    // Define the columns for the heatmap, which are all the possible downtime causes.
    const downtimeCauses: (keyof DowntimeData)[] = [
        'Awaiting Ore', 'Belt Drift', 'Blockage', 'Cleaning', 'Contamination', 'Emergency',
        'Human Error', 'inspection', 'Machine Move', 'Overload', 'Switch/Sensor Activation',
        'Awaiting Train', 'External Services - Power/Water', 'Full/Empty Stockpile', 'No Feed', 'Weather',
        'Breakdown Maintenance', 'Predictive Maintenance', 'Scheduled Maintenance Overrun', 'Scheduled Maintenance',
        'STOP' // Added STOP for unclassified downtime
    ];

    // Transform the API data into the series format required by ApexCharts Heatmap
    const series = data.map(assetData => {
        return {
            name: assetData.DisplayName,
            data: downtimeCauses.map(cause => {
                const value = assetData[cause] as number | null;
                return {
                    x: cause,
                    y: value || 0 // Use 0 if the value is null or undefined
                };
            })
        };
    });

    const options: ApexCharts.ApexOptions = {
        chart: {
            height: 500,
            type: 'heatmap',
            toolbar: {
                show: false,
            }
        }, 
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                radius: 0,
                useFillColorAsStroke: false,
                // Define the color scale based on downtime hours
                colorScale: {
                    ranges: [
                        {
                            from: 0,
                            to: 0,
                            name: 'No Downtime',
                            color: '#2F4F4F' // Green for zero hours
                        },
                        {
                            from: 0.1,
                            to: 2,
                            name: 'Low (0.1 - 2 hrs)',
                            color: '#BEE9E8' // Blue for low values
                        },
                        {
                            from: 2.1,
                            to: 8,
                            name: 'Medium (2.1 - 8 hrs)',
                            color: '#F3D582' // Yellow for medium values
                        },
                        {
                            from: 8.1,
                            to: 10000, // A large number to catch all higher values
                            name: 'High (> 8 hrs)',
                            color: '#FF4560' // Red for high values
                        }
                    ]
                }
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                colors: ['#000']
            },
            formatter: function (val) {
                if (typeof val === 'number' && val > 0) {
                    return val.toFixed(0) + 'h';
                }
                // Show the value only if it's greater than 0
                return '';
            }
        },
        stroke: {
            show: true,
            width: 3,
            colors: ['#191970']
        },


        xaxis: {
            type: 'category',
            labels: {
                rotate: -40,
                style: {
                    fontSize: '12px',
                    colors: '#FFFFFF'
                },

                formatter: function (value) {
                    if (value == 'STOP') {
                        return 'Not Classified';
                    }
                    return value;
                }
            }
        },
        yaxis: { 
            labels: { 
                style: {
                    fontSize: '12px',
                    colors: '#FFFFFF'
                },
            }
        },
        legend: {
            labels: {
                colors: '#FFFFFF'
            }
        },
 
        tooltip: {
            y: {
                formatter: (val) => `${val.toFixed(2)} hours`
            }
        }
    };

    return (
        <DashboardCard>
            <VStack align="stretch" spacing={4}>
                <Heading size="md">{widgetName}</Heading>
                <Flex direction={{ base: "column", md: "row" }} gap={4} align="end"> 

                    <Box>
                        <Text fontSize="sm" mb={1} color="gray.400">Start Date Selector</Text>
                        <Input 
                            type="date" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)}
                            size="sm" bg="gray.700" borderColor="gray.600" color="white"
                        />
                    </Box>

                    <Box>
                        <Text fontSize="sm" mb={1} color="gray.400">End Date Selector</Text>
                        <Input 
                            type="date" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)}
                            size="sm" bg="gray.700" borderColor="gray.600" color="white"
                        />
                    </Box>
                </Flex>
                <Box>
                    <ReactApexChart options={options} series={series} type="heatmap" height={800} width={2000} />
                </Box>
            </VStack>
        </DashboardCard>
    );
};

export default DownTimeHeatMap;
