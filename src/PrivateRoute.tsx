import { Navigate, Outlet, RouteProps } from "react-router-dom";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";

function PrivateRoute({ Component, ...props }: RouteProps) {
  const { token } = useSelector((state: RootState) => state.user);

  return token ? <Outlet /> : <Navigate to="/backoffice" replace />;
}

export default PrivateRoute;