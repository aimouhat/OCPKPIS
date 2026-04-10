import { Box, Heading, VStack } from "@chakra-ui/react";
import ReactApexChart from "react-apexcharts";
import { useKpiData } from "../../hooks/useKpiData";
import DashboardCard from "../common/DashboardCard";
import DashboardCardSkeleton from "../common/DashboardCardSkeleton";
import DashboardCardErrorMessage from "../common/DashboardCardErrorMessage";
import type { ApexOptions } from "apexcharts";

interface Props {
    widgetName: string;
    axisNames: string[];
    actualTagNames: string[];
    targetTagNames: string[];
}

const RadarChart_Act_Targ = ({ widgetName, axisNames, actualTagNames, targetTagNames }: Props) => {
    const allTags = [...actualTagNames, ...targetTagNames];
    const { data, isLoading, error } = useKpiData({
        apiType: "API_Actual",
        tagNames: allTags,
    });

    if (isLoading) return <DashboardCardSkeleton h="40vh" />;
    if (error || !data) return <DashboardCardErrorMessage />;

    const findValue = (tagName: string) => data.find(d => d.tagname === tagName)?.value ?? 0;

    const actualData = actualTagNames.map(findValue);
    const targetData = targetTagNames.map(findValue);

    const series = [
        { name: "Actual", data: actualData },
        { name: "Target", data: targetData },
    ];

    const options: ApexOptions = {
        chart: {
            type: "radar",
            foreColor: "#fff",
            toolbar: { show: false },
        },
        xaxis: {
            categories: axisNames,
            labels: {
                style: {
                    colors: Array(axisNames.length).fill("#CBD5E0"),
                    fontSize: '14px',
                }
            }
        },
        yaxis: {
            show: true,
            tickAmount: 4, 
            labels: {
                style: {
                    colors: '#A0AEC0',
                    fontSize: '14px', 
                },
                formatter: (val: number) => val.toFixed(0),
            },
        },
        stroke: {
            width: 2,
        },
        fill: {
            opacity: [0,0],
        },
        markers: {
            size: 4,
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
        },
        // THE FIX: Added tooltip configuration for a dark theme.
        tooltip: {
            theme: 'dark',
        },
        colors: ['#008FFB', '#00ff912a'],
        plotOptions: {
            radar: {
                polygons: {
                    strokeColors: '#4A5568',
                    connectorColors: '#63B3ED',
                }
            }
        }
    };

    return (
        <DashboardCard minH="40vh">
            <VStack h="100%" align="stretch" spacing={2}>
                <Heading size="md">{widgetName}</Heading>
                <Box flex={1} minH={0}>
                    <ReactApexChart options={options} series={series} type="radar" height="100%" />
                </Box>
            </VStack>
        </DashboardCard>
    );
};

export default RadarChart_Act_Targ;
