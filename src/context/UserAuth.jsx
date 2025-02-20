
import React, { createContext,useState } from "react";

export const UserAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const setUserData = (data) => {
        setUser(data);
    };

    return (
        <UserAuthContext.Provider value={{ user, setUser, setUserData }}>
            {children}
        </UserAuthContext.Provider>
    );
};