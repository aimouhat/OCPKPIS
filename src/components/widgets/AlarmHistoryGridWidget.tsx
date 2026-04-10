import React, { useState, useEffect } from 'react';
import { 
    Box, Heading, VStack, Table, Thead, Tbody, Tr, Th, Td, 
    Badge, Text, Tooltip, useColorModeValue 
} from "@chakra-ui/react";
import DashboardCard from '../common/DashboardCard';
import DashboardCardSkeleton from '../common/DashboardCardSkeleton';
import DashboardCardErrorMessage from '../common/DashboardCardErrorMessage';

// API URL (Hardcoded for stability)
const API_BASE_URL = 'http://localhost:3001';

// 1. DATA INTERFACE (Matches the SQL Columns)
interface AlarmHistoryRecord {
    VT_Start: string;
    AssetPath: string;
    TagName: string;
    TagDescription: string;
    Value: number;
    Limit: number;
    Priority: number | string;
    Message: string;
}

interface Props {
    widgetName: string;
    limit?: number; // Optional prop to control how many rows (default 15)
}

const AlarmHistoryGridWidget = ({ widgetName, limit = 15 }: Props) => {
    
    const [alarms, setAlarms] = useState<AlarmHistoryRecord[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Styling
    const headerColor = useColorModeValue('gray.600', 'gray.400');
    const rowHoverBg = useColorModeValue('gray.50', 'whiteAlpha.100');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    // 2. FETCH DATA FUNCTION
    const fetchHistory = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/alarm-history`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ limit: limit }), // Send the requested limit
            });

            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
            
            const json = await response.json();
            setAlarms(json);
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    };

    // 3. AUTO-REFRESH (Every 60 Seconds)
    useEffect(() => {
        fetchHistory(); // Initial load
        const interval = setInterval(fetchHistory, 60000); // 60 refresh
        return () => clearInterval(interval);
    }, [limit]);

    // 4. HELPER: Priority Badge Color
    const getPriorityBadge = (prio: number | string) => {
        const p = Number(prio);
        if (p === 1 || prio === 'CRITICAL') return <Badge colorScheme="red">CRIT</Badge>;
        if (p === 2 || prio === 'HIGH') return <Badge colorScheme="orange">HIGH</Badge>;
        return <Badge colorScheme="blue">LOW</Badge>;
    };

    // 5. HELPER: Clean Asset Name
    // Removes the long "OCP/BENGUERIR/Assets/" prefix to save space
    const cleanAsset = (path: string) => {
        if (!path) return "-";
        return path.replace('OCP/BENGUERIR/Assets/', '').split('/')[0];
    };

    // --- RENDER ---
    
    if (isLoading && alarms.length === 0) return <DashboardCardSkeleton h="400px" />;
    
    if (error) return (
        <DashboardCard>
            <DashboardCardErrorMessage />
            <Text color="red.300" fontSize="sm" mt={2}>{error.message}</Text>
        </DashboardCard>
    );

    return (
        <DashboardCard minH="400px" overflow="hidden">
            <VStack align="stretch" spacing={4} h="100%">
                
                {/* Header */}
                <Heading size="md" display="flex" justifyContent="space-between">
                    {widgetName}
                    <Text fontSize="xs" color="gray.500" fontWeight="normal">
                        Last {limit} Events
                    </Text>
                </Heading>

                {/* Table Container - Scrollable */}
                <Box overflowX="auto" overflowY="auto" flex={1}>
                    <Table size="sm" variant="simple">

                        <Thead position="sticky" top={0} bg="gray.800" zIndex={1}>
                            <Tr>
                                <Th color={headerColor} borderColor={borderColor}>Time</Th>
                                <Th color={headerColor} borderColor={borderColor}>Asset</Th>
                                <Th color={headerColor} borderColor={borderColor}>Tag</Th>
                                <Th color={headerColor} borderColor={borderColor}>Description</Th>
                                <Th color={headerColor} borderColor={borderColor} isNumeric>Value</Th>
                                <Th color={headerColor} borderColor={borderColor} isNumeric>Limit</Th>
                                <Th color={headerColor} borderColor={borderColor}>Pri</Th>
                                <Th color={headerColor} borderColor={borderColor}>Message</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {alarms.map((row, index) => (
                                <Tr key={index} _hover={{ bg: rowHoverBg }} borderBottomWidth="1px" borderColor={borderColor}>
                                    
                                    {/* 1. Time */}
                                    <Td fontSize="xs" whiteSpace="nowrap">
                                        {new Date(row.VT_Start).toLocaleString('en-GB', { 
                                            month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' 
                                        })}
                                    </Td>

                                    {/* 2. Asset (Cleaned) */}
                                    <Td fontSize="xs" fontWeight="bold">{cleanAsset(row.AssetPath)}</Td>

                                    {/* 3. Tag */}
                                    <Td fontSize="xs" maxW="120px" isTruncated title={row.TagName}>
                                        {row.TagName}
                                    </Td>

                                    {/* 4. Description */}
                                    <Td fontSize="xs" maxW="150px" isTruncated title={row.TagDescription}>
                                        {row.TagDescription}
                                    </Td>

                                    {/* 5. Value */}
                                    <Td fontSize="xs" isNumeric color="cyan.300">
                                        {Number(row.Value).toFixed(2)}
                                    </Td>

                                    {/* 6. Limit */}
                                    <Td fontSize="xs" isNumeric color="orange.300">
                                        {Number(row.Limit).toFixed(2)}
                                    </Td>

                                    {/* 7. Priority */}
                                    <Td>{getPriorityBadge(row.Priority)}</Td>

                                    {/* 8. Message */}
                                    <Td fontSize="xs" maxW="200px" isTruncated title={row.Message}>
                                        {row.Message}
                                    </Td>

                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </VStack>
        </DashboardCard>
    );
};

export default AlarmHistoryGridWidget;