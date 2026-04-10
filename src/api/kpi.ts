import { type KpiRecord, type UseKpiDataParams } from "../types/index";

//const API_BASE_URL = `http://localhost:3001`;

const API_BASE_URL = `http://localhost:3001`;
//const API_BASE_URL = `http://localhost:${import.meta.env.VITE_API_PORT || 3001}`;
//const API_BASE_URL = `http://172.26.4.3:${import.meta.env.VITE_API_PORT || 3001}`;
//const API_BASE_URL = ``;


export const fetchKpiData = async ({
  apiType,
  tagNames,
  timePeriodInHours,
  startTime,
  endTime,
}: UseKpiDataParams): Promise<KpiRecord[]> => {
  let endpoint = "";
  switch (apiType) {
    case "API_Actual":
      endpoint = "/api/actual";
      break;
    case "API_TimeSeries":
      endpoint = "/api/timeseries";
      break;
    case "API_Aggregated":
      endpoint = "/api/aggregated";
      break;
    case "API_LastUpdated":
      endpoint = "/api/last-updated";
      break;
  }

  const bodyPayload = {
    tagNames,
    timePeriodInHours,
    startTime,
    endTime,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyPayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`API Error (${response.status}) from ${endpoint}:`, errorText);
    throw new Error(`Failed to fetch data from ${endpoint}. Server says: ${errorText}`);
  }

  return response.json();
};
