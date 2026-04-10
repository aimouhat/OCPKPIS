/**
 * Development/Testing Configuration
 * 
 * Set these flags to true to enable mock data for development and testing
 * Set to false to use real API data
 */

export const DEV_CONFIG = {
  // Enable mock KPI data (replaces actual API calls)
  USE_MOCK_KPI_DATA: true,
  
  // Show debug information in console
  DEBUG_MODE: true,
  
  // Log all API calls
  LOG_API_CALLS: false,
};

// Easy toggle function
export const toggleMockData = (enable: boolean) => {
  DEV_CONFIG.USE_MOCK_KPI_DATA = enable;
  console.log(`Mock data mode: ${enable ? 'ENABLED ✓' : 'DISABLED ✗'}`);
};

// Log configuration
export const logConfig = () => {
  console.log('Development Configuration:', DEV_CONFIG);
};
