export type ApiType = "API_Actual" | "API_TimeSeries" | "API_Aggregated" | "API_LastUpdated";

export interface KpiRecord {
    tagname: string;
    value: number;
    timestamp: string;
}

export interface UseKpiDataParams {
    apiType: ApiType;
    tagNames: string[];
    timePeriodInHours?: number;
    startTime?: string;
    endTime?: string;
}

export interface UseKpiDataReturn {
    data: KpiRecord[] | null;
    isLoading: boolean;
    error: Error | null;
}