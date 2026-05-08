import { Navigate } from "react-router-dom";
import { isAuthenticated, getAccount } from "./auth";


export function ProtectedRoute({ children, allowedRoles, allowedTypes }) {
  const authenticated = isAuthenticated();
  const account = getAccount();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(account?.nivel)) {
    return <Navigate to="/login" replace />;
  }

  if (allowedTypes && !allowedTypes.includes(account?.tipo)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}