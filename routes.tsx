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
import MaintenancePage from "./pages/MaintenancePage"; // Import the new page
import EngineeringEquipmentPerformance from "./pages/EngineeringEquipmentPerformance"; // Import the new page
 

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
      { path: "flotation-reagent-preparation", Component: EngineeringEquipmentPerformance }, 

      
    ],
  },
]);

export default router;
