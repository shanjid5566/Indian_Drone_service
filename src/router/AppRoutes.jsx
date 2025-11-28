import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/common/Layout";
import { DashboardLayout } from "../components/common/DashboardLayout";

import NotAuthorizedPage from "../pages/NotAuthorizedPage";
import NotFoundPage from "../pages/NotFoundPage";

// Dashboard Components
import AdminDashboard from "../components/admin/components/AdminDashboard";

// Admin Components
import Jobs from "../components/admin/components/Jobs";
import PaymentsManagement from "../components/admin/components/PaymentsManagement";
import Reports from "../components/admin/components/Reports";
import UserManagement from "../components/admin/components/UserManagement";
import UserManagementDetails from "../components/admin/components/UserManagementDetails";
import Complaints from "../components/admin/components/Complaints";
import ComplaintDetails from "../components/admin/components/ComplaintDetails";
import ComplaintFeedback from "../components/admin/components/ComplaintFeedback";
import AdminServices from "../components/admin/components/Services";
import Settings from "../components/admin/components/Settings";
import OrderDetails from "../components/admin/components/OrderDetails";

// Field Agent Components
import FieldAgentDashboard from "../components/fieldAgent/components/FieldAgentDashboard";

// Private Route Components
import {
  PrivateRoute,
  PrivateAdminRoute,
  PrivateEmployeeRoute,
  PrivateFieldAgentRoute,
  PrivateMarketingRoute,
} from "./PrivateRoute";
import { RoleBasedRedirect } from "./RoleBasedRedirect";
import LeadManagment from "../components/marketing/components/LeadManagment";
import MainLayout from "./../LandingPageUI/Layout/MainLayout";
import Services from "./../LandingPageUI/Pages/Services";
import About from "./../LandingPageUI/Pages/About";
import Blog from "./../LandingPageUI/Pages/Blog";
import Contact from "./../LandingPageUI/Pages/Contact";
import Dashboard from "../components/employee/employdashboard/Dashboard";
import Coustomerpage from "../components/employee/employdashboard/Coustomerpage";
import OrderManagementPage from "../components/employee/employdashboard/OrderManagementPage";
import MessagePage from "../components/employee/employdashboard/MessagePage";
import PaymentManagement from "../components/employee/employdashboard/PaymentManagement";
import SupportPage from "../components/employee/employdashboard/SupportPage";
import ReportAnalysisPage from "../components/employee/employdashboard/components/ReportAnalysisPage";
import CoustomerDetailsPage from "../components/employee/employdashboard/components/CoustomerDetailsPage";

import OrderDetailsPage from "../components/employee/employdashboard/components/OrderDetailsPage";
import MarketingDashBoard from "../components/marketing/components/MarketingDashBoard";
import Analytics from "./../components/marketing/Analytics";
import ForgotPasswordFlow from "../pages/login/ForgetPasswordFllow";
import LoginPage from "../pages/login/LoginPage";
import SignUpFlow from "../pages/signUp/SignUpFllow";
import SeasonalCampaignDetails from "../components/marketing/components/SeasonalCampaignDetails";
import LoyalityCampaingnDetails from "../components/marketing/components/LoyalityCampaingnDetails";
import Campaigns from "./../components/marketing/components/Campaigns";
import NotificationPanel from "../components/marketing/components/NotificationPanel";
import TrainingNCertification from "../LandingPageUI/Components/TrainingNCertification";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainLayout />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/trainings",
        element: <TrainingNCertification/>
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "login/forget-password",
        element: <ForgotPasswordFlow />,
      },
      {
        path: "signup",
        element: <SignUpFlow />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateAdminRoute>
        <DashboardLayout />
      </PrivateAdminRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "users",
        element: <UserManagement />,
      },
      {
        path: "users/:userId",
        element: <UserManagementDetails />,
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: 'payments',
        element: <PaymentsManagement />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "complaints",
        element: <Complaints />,
      },
      {
        path: 'services',
        element: <AdminServices />,
      },
    ],
  },
  {
    path: "/admin/settings",
    element: (
      <PrivateAdminRoute>
        <Settings />
      </PrivateAdminRoute>
    ),
  },
  {
    path: '/admin/order-details/:operatorId',
    element: (
      <PrivateAdminRoute>
        <OrderDetails />
      </PrivateAdminRoute>
    ),
  },
  {
    path: '/admin/complaint-details/:id',
    element: (
      <PrivateAdminRoute>
        <ComplaintDetails />
      </PrivateAdminRoute>
    ),
  },
  {
    path: '/admin/complaint-feedback/:id',
    element: (
      <PrivateAdminRoute>
        <ComplaintFeedback />
      </PrivateAdminRoute>
    ),
  },
  {
    path: '/employee',
    element: (
      <PrivateEmployeeRoute>
        <DashboardLayout />
      </PrivateEmployeeRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "customers/:customerId",
        element: <CoustomerDetailsPage />,
      },
      {
        path: "customers",
        element: <Coustomerpage />,
      },

      {
        path: "customers/report-analysis",
        element: <ReportAnalysisPage />,
      },
      {
        path: "orders",
        element: <OrderManagementPage />,
      },
      {
        path: "orders/:orderId",
        element: <OrderDetailsPage />,
      },
      {
        path: "payments",
        element: <PaymentManagement />,
      },
      {
        path: "supports",
        element: <SupportPage />,
      },
      {
        path: "messages",
        element: <MessagePage />,
      },
    ],
  },
  {
    path: "/field-agent",
    element: (
      <PrivateFieldAgentRoute>
        <DashboardLayout />
      </PrivateFieldAgentRoute>
    ),
    children: [
      {
        index: true,
        element: <FieldAgentDashboard />,
      },
    ],
  },
  {
    path: "/marketing",
    element: (
      <PrivateMarketingRoute>
        <DashboardLayout />
      </PrivateMarketingRoute>
    ),
    children: [
      {
        index: true,
        element: <MarketingDashBoard />,
      },
      {
        path:"notifications",
        element:<NotificationPanel/>
      },
      {
        path: "campaigns/seasonal/:id",
        element: <SeasonalCampaignDetails />,
      },
      {
        path: "campaigns/loyality/:id",
        element: <LoyalityCampaingnDetails />,
      },
      {
        path: "Campaigns",
        element: <Campaigns />,
      },
      {
        path: "LeadManagment",
        element: <LeadManagment />,
      },

      {
        path: "analytics",
        element: <Analytics />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <RoleBasedRedirect />
      </PrivateRoute>
    ),
  },
  {
    path: "/unauthorized",
    element: <NotAuthorizedPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export { AppRoutes };
