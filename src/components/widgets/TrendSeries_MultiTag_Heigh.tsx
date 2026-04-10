import { Box, Heading } from "@chakra-ui/react";
import ReactApexChart from "react-apexcharts";
import { useKpiData } from "../../hooks/useKpiData";
import DashboardCard from "../common/DashboardCard";
import DashboardCardSkeleton from "../common/DashboardCardSkeleton";
import DashboardCardErrorMessage from "../common/DashboardCardErrorMessage";
import type { ApexOptions } from "apexcharts";

interface Props {
  widgetName: string;
  tagNames: string[];
  trendNames: string[];
  timePeriodInHours?: number; // Make this optional
  startTime?: string;         // Add this
  endTime?: string;           // Add this
}

const TrendSeries_MultiTag = ({
  widgetName,
  tagNames,
  trendNames,
  timePeriodInHours,
  startTime, // Add this
  endTime,   // Add this
}: Props) => {
  const { data, isLoading, error } = useKpiData({
    apiType: "API_TimeSeries",
    tagNames,
    timePeriodInHours,
    startTime, // Pass it down
    endTime,   // Pass it down
  });

  if (isLoading) return <DashboardCardSkeleton />;
  if (error || !data) return <DashboardCardErrorMessage />;

  const series = tagNames.map((tagName, index) => {
    const trendData = data
      .filter((d) => d.tagname === tagName)
      .map((d) => ({
        x: new Date(d.timestamp).getTime(),
        y: d.value,
      }));
    return {
      name: trendNames[index] || tagName,
      data: trendData,
    };
  });

  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      foreColor: "#fff",
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => val.toFixed(2),
      },
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy HH:mm",
      },
      theme: "dark",
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
  };

  return (
    <DashboardCard>
      <Heading size="md" mb={4}>{widgetName}</Heading>
      <Box>
        <ReactApexChart options={options} series={series} type="line" height={300} />
      </Box>
    </DashboardCard>
  );
};

export default TrendSeries_MultiTag;