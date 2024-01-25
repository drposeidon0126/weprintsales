import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, redirectPath = "/auth/sign-in", children }) => {

    const token = localStorage.getItem("token");

    if (!token) {
        return (<Navigate to={redirectPath} replace />);
    }

    return children;
};

export default ProtectedRoute;
