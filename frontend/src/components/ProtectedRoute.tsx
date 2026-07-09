import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoadingScreen } from "./LoadingScreen";

export function ProtectedRoute({ role }: { role?: "admin" }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (role === "admin" && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
