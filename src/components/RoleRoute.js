import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleRoute({ allowedRoles, children }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/courses" replace/>;
  }

  // Correct role
  return children;
}

export default RoleRoute;
