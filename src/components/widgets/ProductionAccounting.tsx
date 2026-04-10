import { useState, useEffect, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Heading, VStack, Text, Input, Flex, Select, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, useColorModeValue } from "@chakra-ui/react";
import type { ApexOptions } from 'apexcharts';
import DashboardCard from '../common/DashboardCard';
import DashboardCardSkeleton from '../common/DashboardCardSkeleton';
import DashboardCardErrorMessage from '../common/DashboardCardErrorMessage';
import { useKpiData } from '../../hooks/useKpiData';
import type { DowntimeRecord } from '../../types/downtime';

const API_BASE_URL = `http://localhost:3001`;

// --- Configuration ---
const REASON_CONFIG: Record<string, { label: string; causes: string[] }> = {
    'OD': {
        label: 'Operational Delays (OD)',
        causes: [
            'Awaiting Ore', 'Belt Drift', 'Blockage', 'Cleaning', 'Contamination',
            'Emergency', 'Human Error', 'inspection', 'Machine Move', 'Overload',
            'Switch/Sensor Activation' 
        ]
    },
    'SD': {
        label: 'Standby (SD)',
        causes: [
            'Awaiting Train', 'External Services - Power/Water', 'Full/Empty Stockpile',
            'No Feed', 'Weather' 
        ]
    },
    'UM': {
        label: 'Unscheduled Maintenance (UM)',
        causes: [
            'Breakdown Maintenance', 'Predictive Maintenance', 'Scheduled Maintenance Overrun' 
        ]
    },
    'SM': {
        label: 'Scheduled Maintenance (SM)',
        causes: [
            'Scheduled Maintenance' 
        ]
    },
    'Unclassified': {
        label: 'Unclassified',
        causes: ['STOP']
    }
};

interface Props {
    widgetName: string;
    productionRateTag?: string;
    priceTag?: string;
    initialStartTime?: string;
    initialEndTime?: string;
    initialReason?: string;
}

const ProductionAccountingWidget = ({ 
    widgetName, 
    productionRateTag = "CV_ MainLineDailyProduction", 
    priceTag = "CV_ ConcetratePrice",
    initialStartTime,
    initialEndTime,
    initialReason = 'OD'
}: Props) => {
    // --- State ---
    const [selectedReason, setSelectedReason] = useState<string>(initialReason);
    const [downtimeData, setDowntimeData] = useState<DowntimeRecord | null>(null);
    const [isDowntimeLoading, setIsDowntimeLoading] = useState(true);
    const [downtimeError, setDowntimeError] = useState<Error | null>(null);

    // Date State (Default to last 7 days)
    const [startDate, setStartDate] = useState<string>(() => {
        if (initialStartTime) return new Date(initialStartTime).toISOString().split('T')[0];
        const d = new Date();
        d.setDate(d.getDate() - 7);
        return d.toISOString().split('T')[0];
    });
    const [endDate, setEndDate] = useState<string>(() => {
        if (initialEndTime) return new Date(initialEndTime).toISOString().split('T')[0];
        return new Date().toISOString().split('T')[0];
    });

    // --- KPI Data Fetching (Real-time) ---
    const { data: kpiData, isLoading: isKpiLoading, error: kpiError } = useKpiData({
        apiType: "API_Actual",
        tagNames: [productionRateTag, priceTag],
    });

    // --- Downtime Data Fetching ---
    useEffect(() => {
        const fetchDowntime = async () => {
            setIsDowntimeLoading(true);
            setDowntimeError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/api/downtime`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        assetNames: ["Main_Plant_Line"], 
                        startTime: startDate, 
                        endTime: endDate 
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`API Error (${response.status}): ${errorText}`);
                }
                const result = await response.json();
                // We expect a list, but we only queried for one asset.
                setDowntimeData(result.length > 0 ? result[0] : null);
            } catch (err) {
                setDowntimeError(err as Error);
            } finally {
                setIsDowntimeLoading(false);
            }
        };

        if (startDate && endDate) {
            fetchDowntime();
        }
    }, [startDate, endDate]); // Re-fetch when dates change. Note: Reason change doesn't need re-fetch, just re-calc.

    // --- Calculations ---
    const calculations = useMemo(() => {
        if (!downtimeData || !kpiData) return null;

        // 1. Get KPI Values
        const getKpiValue = (tag: string) => {
            const record = kpiData.find(d => d.tagname === tag);
            return record && typeof record.value === 'number' ? record.value : 0;
        };

        const productionRate = getKpiValue(productionRateTag); // Tons per Day
        const pricePerTon = getKpiValue(priceTag); // $ per Ton

        // 2. Calculate Losses for selected causes
        const causes = REASON_CONFIG[selectedReason].causes;
        const chartData: { cause: string, moneyLost: number, tonsLost: number, days: number }[] = [];
        
        let totalDays = 0;
        let totalTons = 0;
        let totalMoney = 0;

        causes.forEach(cause => {
            // Access dynamic property safely
            const hours = (downtimeData as any)[cause] || 0;
            const days = hours / 24;
            
            // Loss Calculation: (Downtime Days) * (Tons/Day)
            const tonsLost = days * productionRate * 24;
            const moneyLost = tonsLost * pricePerTon;

            totalDays += days;
            totalTons += tonsLost;
            totalMoney += moneyLost;

            chartData.push({
                cause,
                moneyLost,
                tonsLost,
                days
            });
        });

        return { chartData, totalDays, totalTons, totalMoney, productionRate, pricePerTon };
    }, [downtimeData, kpiData, selectedReason, productionRateTag, priceTag]);

    // --- Render Helpers ---
    const textColor = useColorModeValue("gray.800", "white");
    const labelColor = useColorModeValue("gray.600", "gray.400");

    if (isDowntimeLoading || isKpiLoading) return <DashboardCardSkeleton h={500} />;
    if (downtimeError || kpiError || !calculations) return <DashboardCardErrorMessage />;

    const { chartData, totalDays, totalTons, totalMoney, pricePerTon } = calculations;

    // --- Chart Options ---
    const chartOptions: ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
            background: 'transparent'
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
                columnWidth: '55%',
                distributed: true
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: chartData.map(d => d.cause),
            labels: {
                style: { colors: '#FFFFFF', fontSize: '12px' },
                rotate: -45,
                trim: true,
                minHeight: 80
            }
        },
        yaxis: {
            title: {
                text: 'Losses ($)',
                style: { color: '#FFFFFF' }
            },
            labels: {
                style: { colors: '#FFFFFF' },
                formatter: (val) => val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val.toFixed(0)
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: (val) => `$${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            },
            x: {
                show: true
            }
        },
        legend: { show: false },
        colors: ['#FF4560', '#FEB019', '#00E396', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'],
        grid: {
            borderColor: '#404040'
        }
    };

    const chartSeries = [{
        name: 'Money Lost',
        data: chartData.map(d => d.moneyLost)
    }];

    return (
        <DashboardCard>
            <VStack align="stretch" spacing={4} h="100%">
                <Heading size="md">{widgetName}</Heading>

                {/* Controls */}
                <Flex direction={{ base: "column", md: "row" }} gap={4} align="end" wrap="wrap">
                    <Box>
                        <Text fontSize="sm" mb={1} color="gray.400">Reason Selector</Text>
                        <Select 
                            value={selectedReason} 
                            onChange={(e) => setSelectedReason(e.target.value)}
                            size="sm" width="250px" bg="gray.700" borderColor="gray.600" color="white"
                        >
                            {Object.entries(REASON_CONFIG).map(([key, config]) => (
                                <option key={key} value={key} style={{ color: "white", backgroundColor: "#2D3748" }}>
                                    {config.label}
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
                </Flex>

                {/* Chart */}
                <Box flex={1} minH="300px">
                    <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height="100%" />
                </Box>

                {/* Summary Footer */}
                <Box bg="whiteAlpha.100" p={4} borderRadius="md">
                    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={5}>
                        <Stat>
                            <StatLabel color={labelColor}>Total Downtime</StatLabel>
                            <StatNumber color={textColor} fontSize="2xl">
                                {totalDays.toFixed(2)} <Text as="span" fontSize="sm" color="gray.500">days</Text>
                            </StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel color={labelColor}>Total Production Loss</StatLabel>
                            <StatNumber color={textColor} fontSize="2xl">
                                {totalTons.toLocaleString(undefined, { maximumFractionDigits: 0 })} <Text as="span" fontSize="sm" color="gray.500">tons</Text>
                            </StatNumber>
                        </Stat> 
                        <Stat>
                            <StatLabel color={labelColor}>Total Financial Loss</StatLabel>
                            <StatNumber color="red.300" fontSize="2xl">
                                ${totalMoney.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </StatNumber> 
                        </Stat>
                        <Stat>
                            <StatLabel color={labelColor}>Ton Price</StatLabel>
                            <StatNumber color={textColor} fontSize="2xl">
                                {pricePerTon.toLocaleString(undefined, { maximumFractionDigits: 0 })} <Text as="span" fontSize="sm" color="gray.500">USD/t</Text>
                            </StatNumber>
                        </Stat> 
                    </SimpleGrid>
                </Box>
            </VStack>
        </DashboardCard>
    );
};

export default ProductionAccountingWidget;
