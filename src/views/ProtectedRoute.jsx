import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

function ProtectedRoute({ children }) {
    const { isLoggedIn } = useAuth();

    const location = useLocation();

    return isLoggedIn ? children : <Navigate to={"/login"} state={location}/>
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
