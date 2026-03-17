import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import Work from "./pages/Work";
import Complaint from "./pages/Complaint";
import Report from "./pages/Report";
import UserPage from "./pages/UserPage";

import "./App.css";

function MainLayout() {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="layout-body">
        <Sidebar />
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={2500} />
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/work" element={<Work />} />
            <Route path="/complaint" element={<Complaint />} />
            <Route path="/report" element={<Report />} />
          </Route>
        </Route>

        <Route path="/user" element={<UserPage />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
