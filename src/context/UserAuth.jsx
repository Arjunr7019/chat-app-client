
import React, { createContext, useState, useEffect } from "react";
import Services from "../localStorage/Services";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../assets/Endpoints";
import { Password } from "@mui/icons-material";

export const UserAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [otpSendSuccessfully,setOtpSendSuccessfully] = useState(false);

    const navigate = useNavigate();

    const setUserData = (data) => {
        setUser(data);
    };

    const logoutUser = () => {
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

    const forgotPassword = (email,otp,newPassword) => {
        fetch(`${baseUrl}/forgotPassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                otp,
                newPassword
            }),
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`Failed with status: ${response.status}`);
            }
        }).then((data) => {
            setOtpSendSuccessfully(true);
        }).catch(err => {
            console.log("error:", err);
        })
    };

    return (
        <UserAuthContext.Provider value={{ user, setUser, setUserData, logoutUser,forgotPassword,otpSendSuccessfully }}>
            {children}
        </UserAuthContext.Provider>
    );
};