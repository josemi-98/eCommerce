import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

function ProtectedRoute({ children }) {
    const { isLoggedIn, isLoading } = useAuth();

    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>;
    }


    return isLoggedIn ? children : <Navigate to={"/login"} state={location}/>
}



export default ProtectedRoute;
