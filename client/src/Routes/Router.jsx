import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import MainLayout from "../Layout/MainLayout";
import ApplyDoctor from "../pages/Dashboard/ApplyDoctor";
import Notification from "../pages/Dashboard/Notification";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ProtectorRoute from "./ProtectorRoute";
import PublicRoute from "./PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <PublicRoute><Home /></PublicRoute>,
      },
      {
        path: "/login",
        element: <PublicRoute><Login /></PublicRoute>,
      },
      {
        path: "/signUp",
        element: <PublicRoute><SignUp /></PublicRoute>,
      },
    ]
  },
  {
    path: "/dashboard",
    element: <ProtectorRoute><DashboardLayout /></ProtectorRoute>,
    children: [
      {
        path: "apply-doctor",
        element: <ApplyDoctor />
      },
      {
        path: "notification",
        element: <Notification />
      }
    ]
  }
]);

export default router;