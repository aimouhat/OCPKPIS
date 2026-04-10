import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Heading, VStack, useColorModeValue } from "@chakra-ui/react";
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
    minTagNames: string[]; 
    maxTagNames: string[]; 
}

const RadarChart_Act_Range = ({ 
    widgetName, 
    axisNames, 
    actualTagNames, 
    minTagNames, 
    maxTagNames 
}: Props) => {
    
    // --- 1. COLORS ---
    const COLOR_MAX = '#45ffae2a'; // Dull Green
    const COLOR_MASK = useColorModeValue('white', '#1B213B'); // Mask Color
    const COLOR_ACTUAL = '#008FFB'; // Blue

    // --- 2. LAYOUT STABILITY ---
    // We start with 0. The useEffect below will measure the real width.
    const [chartWidth, setChartWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const allTags = [...actualTagNames, ...minTagNames, ...maxTagNames];
    
    const { data, isLoading, error } = useKpiData({
        apiType: "API_Actual",
        tagNames: allTags,
    });

    const { series, maxValueInSet } = useMemo(() => {
        if (!data) return { series: [], maxValueInSet: 100 };

        const safeNumber = (val: any) => {
            if (val === null || val === undefined) return 0;
            const num = Number(val);
            return isNaN(num) ? 0 : num;
        };

        const findValue = (tagName: string) => {
            let found = data.find(d => d.tagname === tagName);
            if (!found) {
                const cleanTag = tagName.toLowerCase().trim();
                found = data.find(d => d.tagname && d.tagname.toLowerCase().trim() === cleanTag);
            }
            return found ? safeNumber(found.value) : 0;
        };

        const actVals = actualTagNames.map(findValue);
        const minVals = minTagNames.map(findValue);
        const maxVals = maxTagNames.map(findValue);

        const allValues = [...actVals, ...minVals, ...maxVals].filter(n => typeof n === 'number');
        let maxVal = Math.max(...allValues);
        if (maxVal <= 0) maxVal = 100;

        return {
            maxValueInSet: maxVal,
            // CRITICAL ORDER: [Bottom Layer, Middle Mask, Top Line]
            series: [
                { name: "Max Operating Windows", data: maxVals },
                { name: "Min Operating Windows", data: minVals },
                { name: "Actual", data: actVals },
            ]
        };
    }, [data, actualTagNames, minTagNames, maxTagNames]);

    // --- 3. ROBUST WIDTH DETECTOR ---
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                const w = containerRef.current.offsetWidth;
                if (w > 0) setChartWidth(w);
            }
        };

        updateWidth();
        const timer = setTimeout(updateWidth, 500);
        window.addEventListener('resize', updateWidth);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updateWidth);
        };
    }, []);

    if (isLoading) return <DashboardCardSkeleton h="40vh" />;
    if (error || !data) return <DashboardCardErrorMessage />;

    const options: ApexOptions = {
        chart: {
            type: "radar",
            foreColor: "#fff",
            toolbar: { show: false },
            animations: { enabled: false }, // Keep OFF for stability
            background: 'transparent',
            parentHeightOffset: 0
        },
        tooltip: {
            theme: 'dark', // Sets standard dark mode (Grey/Black background)
            style: {
                fontSize: '12px',
                fontFamily: undefined
            },
            x: {
                show: true,
                format: 'dd MMM',
                formatter: undefined,
            },
            y: {
                formatter: function(val) {
                    return val.toFixed(0)
                }
            },
            // Optional: If you want to force the specific blue background color
            // instead of standard black, you can use marker colors or CSS.
            // But usually 'theme: dark' is enough.
        },
        xaxis: {
                    categories: axisNames,
                    labels: {
                        style: {
                            colors: Array(axisNames.length).fill("#CBD5E0"),
                            fontSize: '14px',
                            fontFamily: 'inherit'
                        }
                    }
                },
        yaxis: {
            show: true,
            tickAmount: 4,
            min: 0,
            max: maxValueInSet * 1.1,
            labels: {
                style: { colors: '#A0AEC0',
                    fontSize: '14px',  },
                formatter: (val: number) => val.toFixed(0),
            },
        },
        // --- THE FIX ---
        // We use a single integer for width. This prevents the "0px crash".
        stroke: {
            width: 2, 
            curve: 'smooth',
            colors: [COLOR_MAX, COLOR_MASK, COLOR_ACTUAL]
        },
        fill: {
            // Opacity controls the look:
            // Max (0.4) = Semi-transparent Green
            // Min (1.0) = Solid Mask (Creates the hole)
            // Actual (0.0) = Transparent (Shows line only)
            opacity: [0.4, 1.0, 0.0] 
        },
        markers: {
            // 0 size for Max/Min (Hidden), 4 size for Actual (Visible)
            size: [0, 0, 4], 
            colors: ['transparent', 'transparent', COLOR_ACTUAL],
            strokeColors: ['transparent', 'transparent', '#fff'],
            hover: { size: 6 }
        },
        legend: { position: "top" },
        colors: [COLOR_MAX, COLOR_MASK, COLOR_ACTUAL], 
        plotOptions: {
            radar: {
                polygons: {
                    strokeColors: '#4A5568',
                    connectorColors: '#63B3ED'
                }
            }
        }
    };

    return (
        <DashboardCard minH="40vh">
            <VStack h="100%" align="stretch" spacing={2}>
                <Heading size="md">{widgetName}</Heading>
                
                <div 
                    ref={containerRef} 
                    style={{ 
                        flex: 1, 
                        width: '100%', 
                        height: '350px', 
                        minHeight: '350px',
                        display: 'block',
                        position: 'relative' 
                    }}
                >
                    {chartWidth > 0 && (
                        <ReactApexChart options={options} series={series} type="radar" height="100%" />
                    )}
                </div>
            </VStack>
        </DashboardCard>
    );
};

export default RadarChart_Act_Range;