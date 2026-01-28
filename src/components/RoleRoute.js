import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleRoute({ allowedRoles, children }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userGroups = user.groups?.map(g => g.toLowerCase()) || [];
  
  // Logged in but wrong group
  const hasAccess = allowedRoles?.some(role =>
    userGroups.includes(role.toLowerCase())
  );

  if (!hasAccess) {
    return <Navigate to="/courses" replace />
  }

  // Correct role
  return children;
}

export default RoleRoute;
