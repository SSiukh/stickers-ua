import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectRole } from "../redux/auth/selectors";

const ManagerRoute = ({ component: Component, redirectTo = "/" }) => {
    const role = useSelector(selectRole);

    return role === "manager" ? Component : <Navigate to={redirectTo} />;
};

export default ManagerRoute;
