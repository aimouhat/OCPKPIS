import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import OperatorDashboard from "./pages/OperatorDashboard";
import OperatorInDetailPage from "./pages/OperatorInDetailPage";
import ClassificationAreaPage from "./pages/ClassificationAreaPage"; // 1. Import the new page
import FlotationAreaPage from "./pages/FlotationAreaPage"; // 1. Import the new page
import TailingThickenerPage from "./pages/TailingThickenerPage"; // 1. Import the new page
import AttritionAreaPage from "./pages/AttritionAreaPage"; // 1. Import the new page
import ScrubbingAndScreeningPage from "./pages/ScrubbingAndScreeningPage"; // 1. Import the new page
import PhosphateOreStoragePage from "./pages/PhosphateOreStoragePage"; // 1. Import the new page
import PhosphateProductStoragePage from "./pages/PhosphateProductStoragePage"; // 1. Import the new page
import WaterAndUtilitiesPage from "./pages/WaterAndUtilitiesPage"; // 1. Import the new page
import CoarseRejectAreaPage from "./pages/CoarseRejectAreaPage";
import ProductFiltrationAreaPage from "./pages/ProductFiltrationAreaPage";
import ApcPerformancePage from "./pages/ApcPerformancePage";
import GlobalPlantKpiPage from "./pages/GlobalPlantKpiPage";
import FlotationReagentPage from "./pages/FlotationReagentPage";

import DTKeyEquipment from "./pages/DTKeyEquipment.tsx"; // Import the new page
import DTLines from "./pages/DTLines.tsx"; // Import the new page

import DowntimeKpiPage from "./pages/DowntimeKpiPage"; // Import the new page
import ManagementPage from "./pages/ManagementPage"; // Import the new page
//import MaintenancePage from "./pages/MaintenancePage";
import TailingsHandlingPage from "./pages/TailingsHandlingPage";
import ProductionQualityOperationalPage from "./pages/ProductionQualityOperationalPage";
import ProductionFeedsCostsPage from "./pages/ProductionFeedsCostsPage";

import ProductionPage from "./pages/ProductionPage"; // 1. Import the new page
import ManagementInDetailPage from "./pages/ManagementInDetailPage"; // Add new import

import EngineeringPage from "./pages/EngineeringPage";
import MaintenancePage from "./pages/MaintenancePage";  
import EngineeringRatesCostsApcPage from "./pages/EngineeringRatesCostsApcPage";  
import MaintenenceOperationalPage from "./pages/MaintenenceOperational";  

import MaintenenceAlarmsPage from "./pages/MaintenanceAlarms";

import DowntimeTrendsPage from "./pages/DowntimeTrends";

import EngineeringAlarmsPage from "./pages/EngineeringAlarms";
import OperatorEquipmentPerformance from "./pages/OperatorEquipmentPerformance";

import EquipmentDriveStatus from "./pages/EquipmentDriveStatus";
import EngineeringEquipmentPerformance from "./pages/EngineeringEquipmentPerformance";
import ProductionAccountingDailyReport from "./pages/ProductionAccountingDailyReport";



 
const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "operator-dashboard", Component: OperatorDashboard },
      { path: "operator-in-detail", Component: OperatorInDetailPage }, 
      { path: "classification-area", Component: ClassificationAreaPage }, // 2. Add the new route
      { path: "flotation-area", Component: FlotationAreaPage }, // 2. Add the new route
      { path: "tailing-thickener", Component: TailingThickenerPage }, // 2. Add the new route
      { path: "attrition-area", Component: AttritionAreaPage }, // 2. Add the new route
      { path: "scrubbing-and-screening", Component: ScrubbingAndScreeningPage }, // 2. Add the new route
      { path: "phosphate-ore-storage", Component: PhosphateOreStoragePage }, // 2. Add the new route
      { path: "phosphate-product-storage", Component: PhosphateProductStoragePage }, // 2. Add the new route
      { path: "water-and-utilities", Component: WaterAndUtilitiesPage }, // 2. Add the new route
      { path: "/coarse-reject-area", Component: CoarseRejectAreaPage },
      { path: "product-filtration-area", Component: ProductFiltrationAreaPage },
      { path: "apc-performance", Component: ApcPerformancePage },
      { path: "global-plant-kpi", Component: GlobalPlantKpiPage },
      { path: "flotation-reagent-preparation", Component: FlotationReagentPage },
      { path: "dt-key-equipment", Component: DTKeyEquipment }, // Add the new route
      { path: "dt-lines", Component: DTLines }, // Add the new route
      
      { path: "downtime-kpi", Component: DowntimeKpiPage }, // Add the new route
      { path: "management", Component: ManagementPage }, // Add the new route
      //{ path: "maintenance", Component: MaintenancePage },
      { path: "tailings-handling-and-storage", Component: TailingsHandlingPage }, // Add the new route
      { path: "production-quality-operational", Component: ProductionQualityOperationalPage },
      { path: "production-feeds-costs", Component: ProductionFeedsCostsPage },

       
      
      { path: "management-in-detail", Component: ManagementInDetailPage },  
      { path: "production", Component: ProductionPage },  

      { path: "engineering", Component: EngineeringPage },
      { path: "maintenance", Component: MaintenancePage },  
      { path: "engineering-rates-costs-apc", Component: EngineeringRatesCostsApcPage }, 
      { path: "maintenance-operational", Component: MaintenenceOperationalPage }, 

      { path: "maintenance-alarms", Component: MaintenenceAlarmsPage }, 

      { path: "downtime-trends", Component: DowntimeTrendsPage }, 

      { path: "engineering-alarms", Component: EngineeringAlarmsPage }, 
      
      { path: "operator-equipment-performance", Component: OperatorEquipmentPerformance }, 
      { path: "equipment-drive-status", Component: EquipmentDriveStatus }, 
      { path: "engineering-equipment-performance", Component: EngineeringEquipmentPerformance },
      { path: "production-accounting-report", Component: ProductionAccountingDailyReport },

      

      

      

      


      
    ],
  },
]);

export default router;
