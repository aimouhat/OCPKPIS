export interface TimeSeriesDataPoint {
  x: number | string | Date; // Timestamp or category
  y: number;
}

export interface Series {
  name: string;
  data: TimeSeriesDataPoint[] | number[];
}

export interface KpiWidgetProps {
  title: string;
  // Add other common props for widgets if any
}

export interface TagValue {
  tag: string;
  value: number | string;
  timestamp?: string;
}