export interface DowntimeRecord {
    Name: string;
    DisplayName: string;
    OT: number;
    STOP: number;
    OD: number;
    'Awaiting Ore': number;
    'Belt Drift': number;
    Blockage: number;
    Cleaning: number;
    Contamination: number;
    Emergency: number;
    'Human Error': number;
    inspection: number;
    'Machine Move': number;
    Overload: number;
    'Switch/Sensor Activation': number;
    SD: number;
    'Awaiting Train': number;
    'External Services - Power/Water': number;
    'Full/Empty Stockpile': number;
    'No Feed': number;
    Weather: number;
    UM: number;
    'Breakdown Maintenance': number;
    'Predictive Maintenance': number;
    'Scheduled Maintenance Overrun': number;
    'Scheduled Maintenance': number;
    [key: string]: string | number; // Index signature for dynamic properties
}

export type DowntimeData = DowntimeRecord;

export interface DowntimeRequestParams {
    assetNames: string[];
    startTime: string;
    endTime: string;
}