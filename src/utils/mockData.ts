// Mock data generator for development and testing
export const generateMockKpiData = (tagNames: string[]) => {
  return tagNames.map((tagName) => ({
    tagname: tagName,
    value: Math.floor(Math.random() * 100) + 10, // Random value between 10-110
    timestamp: new Date().toISOString(),
  }));
};

export const getMockDataForTag = (tagName: string): number => {
  // Generate consistent mock data based on tag name
  const seed = tagName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return Math.floor((seed % 100) * 1.5) + 20; // Value between 20-150
};

export const generateMockChartData = (points: number = 24) => {
  const data = [];
  const now = new Date();
  
  for (let i = points; i > 0; i--) {
    const date = new Date(now.getTime() - i * 60 * 60 * 1000); // hourly data
    data.push({
      x: date.toLocaleTimeString(),
      y: Math.floor(Math.random() * 80) + 40,
    });
  }
  
  return data;
};

export const generateMockRadarData = (axisCount: number = 7) => {
  const data = [];
  
  for (let i = 0; i < axisCount; i++) {
    data.push(Math.floor(Math.random() * 100) + 20); // Values between 20-120
  }
  
  return data;
};
