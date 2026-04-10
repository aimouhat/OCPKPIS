import type { ApexOptions } from 'apexcharts';

export const getGlobalApexChartOptions = (isDarkMode: boolean): ApexOptions => ({
  chart: {
    foreColor: isDarkMode ? '#CBD5E0' : '#4A5568', // Chakra gray.400 (dark) / gray.600 (light)
    background: 'transparent', // Let Chakra control background
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
    },
  },
  theme: {
    mode: isDarkMode ? 'dark' : 'light',
    palette: 'palette1', // ApexCharts predefined palettes, or define your own
  },
  grid: {
    borderColor: isDarkMode ? '#4A5568' : '#E2E8F0', // Chakra gray.600 (dark) / gray.200 (light)
  },
  xaxis: {
    labels: {
      style: {
        colors: isDarkMode ? '#A0AEC0' : '#718096', // Chakra gray.500 / gray.500
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: isDarkMode ? '#A0AEC0' : '#718096',
      },
    },
  },
  // Add other global options: legend, tooltip, etc.
});