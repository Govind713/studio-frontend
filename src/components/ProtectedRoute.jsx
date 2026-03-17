import { Navigate, Outlet } from "react-router-dom";
import { getAuthUser } from "../services/auth";

function ProtectedRoute() {
  const user = getAuthUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
