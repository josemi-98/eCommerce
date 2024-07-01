import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import axios from "axios";

export const AuthContext = createContext();

// const API_URL = "http://localhost:3000/users";

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setUserData(parsedData);
            setIsLoggedIn(true);
        }
    }, []);

    // useEffect(() => {
    //     getUsers();
    // }, []);

    // const getUsers = async () => {
    //     try {
    //         const response = await axios.get(API_URL);
    //         setUserData(response.data);
    //     } catch (error) {
    //         console.error("Error fetching users: ", error);
    //     }
    // };

    const handleLogin = ({ name, email }) => {
        setIsLoggedIn(true);
        
        const rol = (name === "admin" && email === "josemimb98@gmail.com") ? 'admin' : 'user';
        
        const userDataObj = { name, email, rol };
        setUserData(userDataObj);
        localStorage.setItem("userData", JSON.stringify(userDataObj));
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

export default AuthProvider;
