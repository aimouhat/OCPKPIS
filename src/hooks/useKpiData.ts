// src/hooks/useKpiData.ts
import { useState, useEffect } from "react";
import { fetchKpiData } from "../api/kpi";
import { generateMockKpiData } from "../utils/mockData";
import { DEV_CONFIG } from "../config/devConfig";
import type { KpiRecord, UseKpiDataParams, UseKpiDataReturn } from "../types";

export const useKpiData = ({
  apiType,
  tagNames,
  timePeriodInHours,
  startTime,  
  endTime,    
}: UseKpiDataParams): UseKpiDataReturn => {
  
  const [data, setData] = useState<KpiRecord[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getData = async () => {
      if (!tagNames || tagNames.length === 0) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        
        // Use mock data if enabled in dev config
        if (DEV_CONFIG.USE_MOCK_KPI_DATA) {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 300));
          const mockData = generateMockKpiData(tagNames);
          if (DEV_CONFIG.DEBUG_MODE) {
            console.log('📊 Mock KPI Data Generated:', mockData);
          }
          setData(mockData);
        } else {
          // Pass new props to the fetch function
          const result = await fetchKpiData({ apiType, tagNames, timePeriodInHours, startTime, endTime });
          setData(result);
        }
      } catch (e) {
        setError(e as Error);
        if (DEV_CONFIG.DEBUG_MODE) {
          console.error('❌ Error fetching KPI data:', e);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getData();

    // Set up auto-refresh every 60 minutes (3600000 ms)
    const intervalId = setInterval(getData, 60 * 60 * 1000);

    // Cleanup function: clears the timer if the component unmounts or dependencies change
    return () => clearInterval(intervalId);

    // Add startTime and endTime to the dependency array
  }, [apiType, JSON.stringify(tagNames), timePeriodInHours, startTime, endTime]);

  return { data, isLoading, error };
};