import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requireRoles?: number[];
}

const ProtectedRoute = ({
  children,
  requireRoles = [],
}: ProtectedRouteProps) => {
  const { user } = useAuth();
  console.log(user);

  if (!user) {
    console.log("no user");
    return <Navigate to="/" replace />;
  }

  const matchRoles =
    !requireRoles.length || requireRoles.includes(Number(user.role));

  if (!matchRoles) {
    return <Navigate to="/404" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;

// PublicRoute component to handle pages like /login for unauthenticated users only
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export { PublicRoute };
