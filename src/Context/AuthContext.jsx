import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
            setUserData(JSON.parse(storedData));
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = ({ name, email }) => {
        setIsLoggedIn(true);
        const userDataObje = { name, email };
        setUserData(userDataObje);
        localStorage.setItem("userData", JSON.stringify(userDataObje));
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserData({});
        localStorage.removeItem("userData");
    };

    const authContextValue = {
        isLoggedIn,
        userData,
        handleLogin,
        handleLogout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
