import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;
  if (!user)
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  return children;
};

export default ProtectedRoute;
