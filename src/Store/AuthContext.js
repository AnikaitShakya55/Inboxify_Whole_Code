import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token, email) => {},
    logout: () => {},
    userEmail: '',
});

const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const initialEmail = localStorage.getItem('email');
    const [token, setToken] = useState(initialToken);
    const [userEmail, setUserEmail] = useState(initialEmail);

    useEffect(() => {
        if (token) {
            setTimeout(() => {
                logoutHandler();
                alert("Your session has expired. Please login again.");
            }, 40 * 60 * 1000); // Logout after 10 minutes of inactivity
        }
    }, [token]);

    const loginHandler = (token, email) => {
        setToken(token);
        setUserEmail(email);
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
    };

    const logoutHandler = () => {
        setToken(null);
        setUserEmail('');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    };

    const userIsLoggedIn = !!token;

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        userEmail: userEmail,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
