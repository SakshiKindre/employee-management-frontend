import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role");

        if (token) {

            setUser({
                token,
                username,
                role
            });

        }

    }, []);

    const loginUser = (userData) => {

        localStorage.setItem("token", userData.token);
        localStorage.setItem("username", userData.username);
        localStorage.setItem("role", userData.role);

        setUser(userData);

    };

    const logoutUser = () => {

        localStorage.clear();

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                loginUser,
                logoutUser
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export const useAuth = () => useContext(AuthContext);