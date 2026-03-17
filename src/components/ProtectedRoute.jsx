import { Navigate, Outlet } from "react-router-dom";
import { getAuthUser } from "../services/auth";

function ProtectedRoute() {
  const user = getAuthUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  // if (user.role !== "user") {
  //   return <Navigate to="/user" replace />;
  // } else if (user.role == "admin") {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return <Outlet />;
}

export default ProtectedRoute;
