
import React, { createContext, useState, useEffect } from "react";
import Services from "../localStorage/Services";
import { useNavigate } from "react-router-dom";

export const UserAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const setUserData = (data) => {
        setUser(data);
    };

    const logoutUser = ()=>{
        Services.Logout();
        navigate("/login")
    }

    useEffect(() => {
        Services.getUser().then(res => {
            if (res) {
                setUserData(res);
                navigate("/")
            } else {
                setUserData(null);
                navigate("/login")
            }
        })
    }, [])

    return (
        <UserAuthContext.Provider value={{ user, setUser, setUserData, logoutUser }}>
            {children}
        </UserAuthContext.Provider>
    );
};